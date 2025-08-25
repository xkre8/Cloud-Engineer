// Modal Functionality
document.addEventListener('DOMContentLoaded', function() {
    const modal = document.getElementById('contactModal');
    const closeBtn = document.querySelector('.close');
    const form = document.getElementById('contactForm');

    // Close modal when clicking X
    closeBtn.onclick = function() {
        modal.style.display = 'none';
    }

    // Close modal when clicking outside
    window.onclick = function(event) {
        if (event.target === modal) {
            modal.style.display = 'none';
        }
    }

    // Handle form submission
    form.onsubmit = function(e) {
        e.preventDefault();
        
        const formData = new FormData(form);
        const name = formData.get('name');
        const email = formData.get('email');
        const phone = formData.get('phone');
        const company = formData.get('company');
        const subject = formData.get('subject');
        const message = formData.get('message');

        // Create email content
        const emailSubject = encodeURIComponent(`[Portfolio] ${subject} - จาก ${name}`);
        const emailBody = encodeURIComponent(`สวัสดีครับ คุณนันทวัฒน์

ชื่อ: ${name}
อีเมล: ${email}
เบอร์โทร: ${phone || 'ไม่ระบุ'}
บริษัท/องค์กร: ${company || 'ไม่ระบุ'}
หัวข้อ: ${subject}

ข้อความ:
${message}

---
ส่งมาจาก Portfolio Website
วันที่: ${new Date().toLocaleDateString('th-TH')}
เวลา: ${new Date().toLocaleTimeString('th-TH')}`);

        // Open email client
        window.open(`mailto:nuntawat.works@gmail.com?subject=${emailSubject}&body=${emailBody}`, '_blank');
        
        // Show success message and close modal
        alert('เปิดโปรแกรมอีเมลเรียบร้อย! กรุณาส่งอีเมลให้เสร็จสิ้น');
        modal.style.display = 'none';
        form.reset();
    }
});