// تحسين دالة التمرير
function setupProductScroll() {
    const containers = document.querySelectorAll('.products-container');
    
    containers.forEach(container => {
        const leftBtn = container.querySelector('.left-btn');
        const rightBtn = container.querySelector('.right-btn');
        const productsGrid = container.querySelector('.products-grid');
        
        // التحقق من عرض الشاشة
        const checkScreenSize = () => {
            const screenWidth = window.innerWidth;
            if (screenWidth >= 360 && screenWidth <= 770) {
                leftBtn.style.display = 'flex';
                rightBtn.style.display = 'flex';
            } else if (screenWidth < 360) {
                leftBtn.style.display = 'none';
                rightBtn.style.display = 'none';
            }
        };
        
        // التحقق عند التحميل وعند تغيير حجم النافذة
        checkScreenSize();
        window.addEventListener('resize', checkScreenSize);
        
        // أحداث التمرير
        leftBtn.addEventListener('click', () => {
            productsGrid.scrollBy({ left: -250, behavior: 'smooth' });
        });
        
        rightBtn.addEventListener('click', () => {
            productsGrid.scrollBy({ left: 250, behavior: 'smooth' });
        });
    });
}

document.addEventListener('DOMContentLoaded', setupProductScroll);
// Mobile menu toggle
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// Shopping cart functionality
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
let cartItems = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartItems++;
        cartCount.textContent = cartItems;
        cartCount.style.display = 'inline-block';
        
        // Product added confirmation
        const productName = button.parentElement.querySelector('.product-title').textContent;
        alert(`${productName} has been added to your cart!`);
    });
});

document.addEventListener('DOMContentLoaded', function() {
    // تعيين الحد الأدنى لتاريخ التسليم (اليوم + يوم واحد)
    const deliveryDate = document.getElementById('deliveryDate');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    deliveryDate.min = tomorrow.toISOString().split('T')[0];
    
    // بيانات المنتجات (يمكن جلبها من API في التطبيق الحقيقي)
    const products = [
        { id: 1, name: "Love Bouquet", price: 20 },
        { id: 2, name: "Birthday Bouquet", price: 25 },
        { id: 3, name: "Wedding Bouquet", price: 30 },
        { id: 4, name: "Rose Bouquet", price: 22 }
    ];
    
    // ملء قائمة المنتجات
    const productSelect = document.getElementById('product');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - $${product.price}`;
        option.dataset.price = product.price;
        productSelect.appendChild(option);
    });
    
    // تحديث ملخص الطلب عند تغيير المنتج
    productSelect.addEventListener('change', updateOrderSummary);
    
    // التحقق من صحة النموذج أثناء الكتابة
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', validateField);
    });
    
    // إرسال النموذج
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            // عرض رسالة التحميل
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Processing... <div class="loading"></div>';
            
            // محاكاة إرسال البيانات (في التطبيق الحقيقي سيكون هنا AJAX)
            setTimeout(() => {
                // رسالة نجاح
                alert('Thank you! Your order has been placed successfully.');
                orderForm.reset();
                updateOrderSummary();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Confirm Order';
            }, 1500);
        }
    });
    
    // وظائف مساعدة
    function validateField(e) {
        const field = e.target;
        const errorMessage = field.parentElement.querySelector('.error-message');
        
        if (field.validity.valid) {
            field.classList.remove('invalid');
            errorMessage.style.display = 'none';
        } else {
            field.classList.add('invalid');
            errorMessage.textContent = getErrorMessage(field);
            errorMessage.style.display = 'block';
        }
    }
    
    function validateForm() {
        let isValid = true;
        document.querySelectorAll('input[required], select[required], textarea[required]').forEach(field => {
            if (!field.validity.valid) {
                field.classList.add('invalid');
                const errorMessage = field.parentElement.querySelector('.error-message');
                errorMessage.textContent = getErrorMessage(field);
                errorMessage.style.display = 'block';
                isValid = false;
            }
        });
        return isValid;
    }
    
    function getErrorMessage(field) {
        if (field.validity.valueMissing) {
            return 'This field is required';
        } else if (field.validity.patternMismatch) {
            return 'Please enter a valid phone number (11 digits)';
        } else if (field.validity.typeMismatch) {
            return 'Please enter a valid email address';
        }
        return 'Invalid input';
    }
    
    function updateOrderSummary() {
        const selectedProduct = productSelect.options[productSelect.selectedIndex];
        const summaryContent = document.querySelector('.summary-content');
        const totalPrice = document.querySelector('.total-price span');
        
        if (productSelect.value === '') {
            summaryContent.innerHTML = '<p>No product selected</p>';
            totalPrice.textContent = '0';
        } else {
            summaryContent.innerHTML = `
                <p><strong>Product:</strong> ${selectedProduct.textContent.split(' - ')[0]}</p>
                <p><strong>Delivery Date:</strong> ${deliveryDate.value || 'Not specified'}</p>
            `;
            totalPrice.textContent = selectedProduct.dataset.price;
        }
    }
});
// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});
// دالة عامة لإنشاء التمرير لكل قسم
function setupProductScroll(containerClass) {
    const containers = document.querySelectorAll(containerClass);
    
    containers.forEach(container => {
        const leftBtn = container.querySelector('.left-btn');
        const rightBtn = container.querySelector('.right-btn');
        const productsGrid = container.querySelector('.products-grid');
        
        leftBtn.addEventListener('click', () => {
            productsGrid.scrollBy({ left: -300, behavior: 'smooth' });
        });
        
        rightBtn.addEventListener('click', () => {
            productsGrid.scrollBy({ left: 300, behavior: 'smooth' });
        });
        
        // إخفاء الأزرار عند النهايات
        productsGrid.addEventListener('scroll', () => {
            const scrollLeft = productsGrid.scrollLeft;
            const maxScroll = productsGrid.scrollWidth - productsGrid.clientWidth;
            
            leftBtn.style.opacity = scrollLeft > 0 ? '1' : '0.5';
            rightBtn.style.opacity = scrollLeft < maxScroll ? '1' : '0.5';
        });
    });
}

// تهيئة التمرير لكل أقسام المنتجات
document.addEventListener('DOMContentLoaded', () => {
    setupProductScroll('.products-container');
});