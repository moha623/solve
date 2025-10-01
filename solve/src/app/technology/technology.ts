import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'app-technology',
  imports: [CommonModule],
  templateUrl: './technology.html',
  styleUrl: './technology.css'
})
export class Technology {
  content = [
  { title: `الأريكة الذكية مع شحن لاسلكي مدمج`, image: 'https://plus.unsplash.com/premium_photo-1664194584375-879a0470f100?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8MTEzfHwlRDglQTclRDklODQlRDglQTMlRDglQjElRDklOEElRDklODMlRDglQTklMjAlRDglQTclRDklODQlRDglQjAlRDklODMlRDklOEElRDglQTl8ZW58MHx8MHx8fDA%3D' },
  { title: `طاولة قهوة بإضاءة وتكنولوجيا ذكية`, image: 'https://images.unsplash.com/photo-1679215805569-7a4450dbbdd1?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Nzh8fCVEOCVBNyVEOSU4NCVEOCVBMyVEOCVCMSVEOSU4QSVEOSU4MyVEOCVBOSUyMCVEOCVBNyVEOSU4NCVEOCVCMCVEOSU4MyVEOSU4QSVEOCVBOXxlbnwwfHwwfHx8MA%3D%3D' },
  { title: `كرسي قابل للتعديل بتحكم صوتي`, image: 'https://plus.unsplash.com/premium_photo-1661310048986-a5ce0ede1f83?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NDl8fCVEOCVBNyVEOSU4NCVEOCVBMyVEOCVCMSVEOSU4QSVEOSU4MyVEOCVBOSUyMCVEOCVBNyVEOSU4NCVEOCVCMCVEOSU4MyVEOSU4QSVEOCVBOXxlbnwwfHwwfHx8MA%3D%3D' },
  { title: `سرير ذكي لمراقبة جودة النوم`, image: 'https://images.unsplash.com/photo-1670222061552-c273834aee0c?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzh8fCVEOCVBNyVEOSU4NCVEOCVBMyVEOCVCMSVEOSU4QSVEOSU4MyVEOCVBOSUyMCVEOCVBNyVEOSU4NCVEOCVCMCVEOSU4MyVEOSU4QSVEOCVBOXxlbnwwfHwwfHx8MA%3D%3D' },
  { title: `أثاث منزلي مستدام ومبتكر`, image: 'https://images.unsplash.com/photo-1680503397671-caa25818d36f?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8Mzl8fCVEOCVBNyVEOSU4NCVEOCVBMyVEOCVCMSVEOSU4QSVEOSU4MyVEOCVBOSUyMCVEOCVBNyVEOSU4NCVEOCVCMCVEOSU4MyVEOSU4QSVEOCVBOXxlbnwwfHwwfHx8MA%3D%3D' }
];

}
