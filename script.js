function setupProductScroll() {
    const containers = document.querySelectorAll('.products-container');
    
    containers.forEach(container => {
        const leftBtn = container.querySelector('.left-btn');
        const rightBtn = container.querySelector('.right-btn');
        const productsGrid = container.querySelector('.products-grid');
        
        const checkScrollNeeded = () => {
            // إظهار الأسهم فقط إذا كان هناك محتوى قابل للتمرير
            const isScrollable = productsGrid.scrollWidth > productsGrid.clientWidth;
            
            if (isScrollable) {
                leftBtn.style.display = 'flex';
                rightBtn.style.display = 'flex';
            } else {
                leftBtn.style.display = 'none';
                rightBtn.style.display = 'none';
            }
            
            // تحديث حالة الأزرار
            productsGrid.dispatchEvent(new Event('scroll'));
        };
        
        leftBtn.addEventListener('click', () => {
            productsGrid.scrollBy({ left: -250, behavior: 'smooth' });
        });
        
        rightBtn.addEventListener('click', () => {
            productsGrid.scrollBy({ left: 250, behavior: 'smooth' });
        });
        
        productsGrid.addEventListener('scroll', () => {
            const scrollLeft = productsGrid.scrollLeft;
            const maxScroll = productsGrid.scrollWidth - productsGrid.clientWidth;
            
            leftBtn.style.opacity = scrollLeft > 0 ? '1' : '0.5';
            rightBtn.style.opacity = scrollLeft < maxScroll ? '1' : '0.5';
        });
        
        // التحقق عند التحميل وعند تغيير الحجم
        checkScrollNeeded();
        window.addEventListener('resize', checkScrollNeeded);
        
        // التحقق بعد تحميل الصور
        const images = productsGrid.querySelectorAll('img');
        images.forEach(img => {
            img.addEventListener('load', checkScrollNeeded);
            if (img.complete) checkScrollNeeded();
        });
    });
}

// القائمة المتنقلة
const hamburger = document.querySelector('.hamburger');
const navLinks = document.querySelector('.nav-links');

hamburger.addEventListener('click', () => {
    navLinks.classList.toggle('active');
});

// إغلاق القائمة عند النقر على رابط
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
    });
});

// عربة التسوق
const addToCartButtons = document.querySelectorAll('.add-to-cart');
const cartCount = document.querySelector('.cart-count');
let cartItems = 0;

addToCartButtons.forEach(button => {
    button.addEventListener('click', () => {
        cartItems++;
        cartCount.textContent = cartItems;
        cartCount.style.display = 'inline-block';
        
        const productName = button.parentElement.querySelector('.product-title').textContent;
        alert(`${productName} has been added to your cart!`);
    });
});

// نموذج الطلب
document.addEventListener('DOMContentLoaded', function() {
    const deliveryDate = document.getElementById('deliveryDate');
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(today.getDate() + 1);
    deliveryDate.min = tomorrow.toISOString().split('T')[0];
    
    const products = [
        { id: 1, name: "Flower Pot", price: 700 },
        { id: 2, name: "Love Bouquet", price: 900 },
        { id: 3, name: "Floral Resin", price: 600 }
    ];
    
    const productSelect = document.getElementById('product');
    products.forEach(product => {
        const option = document.createElement('option');
        option.value = product.id;
        option.textContent = `${product.name} - $${product.price}`;
        option.dataset.price = product.price;
        productSelect.appendChild(option);
    });
    
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
    
    productSelect.addEventListener('change', updateOrderSummary);
    
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
    
    document.querySelectorAll('input, select, textarea').forEach(input => {
        input.addEventListener('input', validateField);
    });
    
    const orderForm = document.getElementById('orderForm');
    orderForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        if (validateForm()) {
            const submitBtn = this.querySelector('button[type="submit"]');
            submitBtn.disabled = true;
            submitBtn.innerHTML = 'Processing... <div class="loading"></div>';
            
            setTimeout(() => {
                alert('Thank you! Your order has been placed successfully.');
                orderForm.reset();
                updateOrderSummary();
                submitBtn.disabled = false;
                submitBtn.textContent = 'Confirm Order';
            }, 1500);
        }
    });
    
    // تهيئة التمرير عند تحميل الصفحة
    setupProductScroll();
    
    // إعادة التحقق بعد اكتمال تحميل الصفحة بالكامل
    window.addEventListener('load', function() {
        setupProductScroll();
        
        // إعادة التحقق بعد نصف ثانية للتأكد من اكتمال كل شيء
        setTimeout(setupProductScroll, 500);
    });
});