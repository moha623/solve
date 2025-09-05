import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, createClient, AuthSession, User } from '@supabase/supabase-js';
import { environment } from '../../envirement/environment';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentUser: User | null = null;
  private authState = new BehaviorSubject<boolean>(false);
  
  authStateChanged = this.authState.asObservable();

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    
    // Initialize auth state
    this.initAuth();
  }

  private async initAuth() {
    // Check for existing session
    const { data: { session } } = await this.supabase.auth.getSession();
    this.currentUser = session?.user ?? null;
    this.authState.next(!!session);

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.currentUser = session?.user ?? null;
      this.authState.next(!!session);
      
      if (event === 'SIGNED_IN') {
        this.router.navigate(['/admin/dashboard']);
      } else if (event === 'SIGNED_OUT') {
        this.router.navigate(['/login']);
      }
    });
  }

  get user(): User | null {
    return this.currentUser;
  }

  get session(): AuthSession | null {
    return this.currentUser ? {
      user: this.currentUser, access_token: '', refresh_token: '',
      expires_in: 0,
      token_type: ''
    } : null;
  }

  get isAuthenticated(): boolean {
    return !!this.currentUser;
  }

  async signUp(email: string, password: string, metadata: any = {}): Promise<void> {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    
    if (error) throw error;
    
    // If email confirmation is required, show message
    if (data.user && data.session === null) {
      throw new Error('يرجى التحقق من بريدك الإلكتروني لإكمال التسجيل');
    }
  }

  async signIn(email: string, password: string): Promise<void> {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
  }

  async signInWithMagicLink(email: string): Promise<void> {
    const { data, error } = await this.supabase.auth.signInWithOtp({
      email,
      options: {
        emailRedirectTo: `${window.location.origin}/admin`
      }
    });
    
    if (error) throw error;
  }

  async signOut(): Promise<void> {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async resetPassword(email: string): Promise<void> {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    
    if (error) throw error;
  }

  async updatePassword(newPassword: string): Promise<void> {
    const { data, error } = await this.supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
  }

  async getProfile() {
    if (!this.currentUser) throw new Error('Not authenticated');
    
    const { data, error } = await this.supabase
      .from('profiles')
      .select('*')
      .eq('id', this.currentUser.id)
      .single();
    
    if (error) throw error;
    return data;
  }

  async updateProfile(updates: any) {
    if (!this.currentUser) throw new Error('Not authenticated');
    
    const { data, error } = await this.supabase
      .from('profiles')
      .update(updates)
      .eq('id', this.currentUser.id);
    
    if (error) throw error;
    return data;
  }
}