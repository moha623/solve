import { Component, inject, NgZone, PLATFORM_ID, Inject, EnvironmentInjector, runInInjectionContext } from '@angular/core';
import { CommonModule, isPlatformBrowser } from '@angular/common';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import {
  Firestore,
  collection,
  addDoc,
  serverTimestamp,
} from '@angular/fire/firestore';
// Commented out Storage imports as upload is disabled
// import {
//   Storage,
//   ref,
//   uploadBytesResumable,
//   getDownloadURL
// } from '@angular/fire/storage';

@Component({
  selector: 'app-dashbord',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './dashbord.html',
  styleUrls: ['./dashbord.css']
})
export class Dashbord {
  isDarkMode = false;
  productForm: FormGroup;
  loading = false;
  successMessage = '';
  errorMessage = '';
  uploadPercent: number | null = null;
  downloadURL = '';  // Will stay empty since upload disabled
  isBrowser: boolean;

  private firestore = inject(Firestore);
  // Commented out storage injection
  // private storage = inject(Storage);
  private fb = inject(FormBuilder);
  private ngZone = inject(NgZone);
  private environmentInjector = inject(EnvironmentInjector);

  constructor(@Inject(PLATFORM_ID) platformId: Object) {
    this.isBrowser = isPlatformBrowser(platformId);
    
    this.productForm = this.fb.group({
      name: ['', Validators.required],
      price: [0, [Validators.required, Validators.min(0)]],
      category: ['', Validators.required],
      stock: [0, [Validators.required, Validators.min(0)]],
      description: ['', Validators.required],
      image: [null, Validators.required]
    });
  }

  async onSubmit() {
    if (this.productForm.invalid || !this.isBrowser) return;

    this.loading = true;
    this.successMessage = '';
    this.errorMessage = '';

    try {
      await runInInjectionContext(this.environmentInjector, async () => {
        // Commented out upload image call
        // if (this.productForm.value.image) {
        //   await this.uploadImage();
        // }

        const productsCollection = collection(this.firestore, 'products');

        // Prepare form data, remove file object which is not storable
        const formData = {...this.productForm.value};
        delete formData.image;

        // Save to Firestore without image URL because upload is disabled
        await addDoc(productsCollection, {
          ...formData,
          imageUrl: '',  // empty string since no upload
          createdAt: serverTimestamp()
        });
      });

      this.successMessage = 'تم إضافة المنتج بنجاح إلى قاعدة البيانات';
      this.resetForm();
    } catch(error) {
      console.error('Error adding product:', error);
      this.errorMessage = 'حدث خطأ أثناء إضافة المنتج. يرجى المحاولة مرة أخرى.';
    } finally {
      this.loading = false;
    }
  }

  // Commented out entire uploadImage method
  /*
  async uploadImage() {
    if (!this.isBrowser) return;
    
    const file = this.productForm.value.image;
    const filePath = `products/${new Date().getTime()}_${file.name}`;

    return runInInjectionContext(this.environmentInjector, async () => {
      const storageRef = ref(this.storage, filePath);
      const uploadTask = uploadBytesResumable(storageRef, file);

      return new Promise<void>((resolve, reject) => {
        uploadTask.on('state_changed',
          (snapshot) => {
            this.ngZone.run(() => {
              this.uploadPercent = Math.round((snapshot.bytesTransferred / snapshot.totalBytes) * 100);
            });
          },
          (error) => {
            this.ngZone.run(() => {
              console.error('Upload failed:', error);
              this.errorMessage = 'خطأ في تحميل الصورة.';
              reject(error);
            });
          },
          async () => {
            try {
              const url = await getDownloadURL(uploadTask.snapshot.ref);
              this.ngZone.run(() => {
                this.downloadURL = url;
                this.uploadPercent = null;
                resolve();
              });
            } catch (error) {
              this.ngZone.run(() => {
                console.error('Error getting download URL:', error);
                reject(error);
              });
            }
          }
        );
      });
    });
  }
  */

  // Keep your file selection method even if upload disabled
  onFileSelected(event: any) {
    const file = event.target.files[0];
    if (file) {
      this.productForm.patchValue({ image: file });
      this.productForm.get('image')?.updateValueAndValidity();
    }
  }

  resetForm() {
    this.productForm.reset({
      name: '',
      price: 0,
      category: '',
      stock: 0,
      description: '',
      // image: null
    });
    this.uploadPercent = null;
    this.downloadURL = '';
  }

  toggleDarkMode() {
    this.isDarkMode = !this.isDarkMode;
    if (this.isBrowser) {
      if (this.isDarkMode) {
        document.documentElement.classList.add('dark');
      } else {
        document.documentElement.classList.remove('dark');
      }
    }
  }
}
