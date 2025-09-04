// services/auth.service.ts
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { SupabaseClient, createClient, AuthSession } from '@supabase/supabase-js';
import { environment } from '../../envirement/environment';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private supabase: SupabaseClient;
  private currentSession: AuthSession | null = null;
  private authState = new BehaviorSubject<boolean>(false);
  
  authStateChanged = this.authState.asObservable();

  constructor(private router: Router) {
    this.supabase = createClient(environment.supabaseUrl, environment.supabaseKey);
    
    // Check for existing session
    this.supabase.auth.getSession().then(({ data }) => {
      this.currentSession = data.session;
      this.authState.next(!!this.currentSession);
    });

    // Listen for auth changes
    this.supabase.auth.onAuthStateChange((event, session) => {
      this.currentSession = session;
      this.authState.next(!!session);
      
      if (event === 'SIGNED_IN') {
        this.router.navigate(['/dashboard']);
      } else if (event === 'SIGNED_OUT') {
        this.router.navigate(['/login']);
      }
    });
  }

  get user() {
    return this.currentSession?.user;
  }

  get session() {
    return this.currentSession;
  }

  async signUp(email: string, password: string, metadata: any = {}) {
    const { data, error } = await this.supabase.auth.signUp({
      email,
      password,
      options: {
        data: metadata
      }
    });
    
    if (error) throw error;
    return data;
  }

  async signIn(email: string, password: string) {
    const { data, error } = await this.supabase.auth.signInWithPassword({
      email,
      password
    });
    
    if (error) throw error;
    return data;
  }

  async signInWithMagicLink(email: string) {
    const { data, error } = await this.supabase.auth.signInWithOtp({
      email
    });
    
    if (error) throw error;
    return data;
  }

  async signOut() {
    const { error } = await this.supabase.auth.signOut();
    if (error) throw error;
  }

  async resetPassword(email: string) {
    const { data, error } = await this.supabase.auth.resetPasswordForEmail(email, {
      redirectTo: `${window.location.origin}/reset-password`
    });
    
    if (error) throw error;
    return data;
  }

  async updatePassword(newPassword: string) {
    const { data, error } = await this.supabase.auth.updateUser({
      password: newPassword
    });
    
    if (error) throw error;
    return data;
  }
}