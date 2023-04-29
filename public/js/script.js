// /* Làm thanh trượt hình ảnh hoạt động: 2 mũi tên tiến và lùi */

// // CHọn tất cả các thẻ chứa sản phẩm bằng cách sử dụng querySelectorAll
// const productContainers = [...document.querySelectorAll('.product-container')];
// const nextBtn = [...document.querySelectorAll('.next-btn')];
// const previousBtn = [...document.querySelectorAll('.previous-btn')];

// // Bây giờ lặp qua từng thẻ bằng cách sử dụng cho từng phương pháp

// productContainers.forEach((item, i) => {
//     // lưu trữ kích thước thẻ bên trong biến này,
//     let containerDimenstions = item.getBoundingClientRect(); // nhận và trả về kích thước phần tử

//     // lưu trữ chiều rộng của vùng chứa cho biến này
//     let containerWidth = containerDimenstions.width;

//     // Bây giờ thêm sự kiện nhấp chuột vào nút tiếp
//     nextBtn[i].addEventListener('click', () => {

//     // tăng giá trị cuộn mục bên trái theo chiều rộng vùng chứa

//         if( item.scrollLeft>1000){

//             item.scrollLeft = 0
//             return
//         }
//             item.scrollLeft += containerWidth;  

//     })

//     previousBtn[i].addEventListener('click', () => {

//         if( item.scrollLeft==0){

//             item.scrollLeft = 1200
//             return
//         }
//     // giảm giá trị cuộn mục bên trái theo chiều rộng vùng chứa
//         item.scrollLeft -= containerWidth;
//     })

// })


// /// Trang category

// const categoryTitle = document.querySelectorAll('.list-category');
// const allCategoryPosts = document.querySelectorAll('.all');

// for(let i = 0; i < categoryTitle.length; i++){
//     categoryTitle[i].addEventListener('click', filterCategory.bind(this, categoryTitle[i]));
// }

// function filterCategory(item){
//     changeActivePosition(item);
//     for(let i = 0; i < allCategoryPosts.length; i++){
//         if(allCategoryPosts[i].classList.contains(item.attributes.id.value)){
//             allCategoryPosts[i].style.display = "block";
//         } else {
//             allCategoryPosts[i].style.display = "none";
//         }
//     }
// }

// function changeActivePosition(activeItem){
//     for(let i = 0; i < categoryTitle.length; i++){
//         categoryTitle[i].classList.remove('active');
//     }
//     activeItem.classList.add('active');
// };



// /* Login page  and Register page*/

// // Đối tượng : `Validator`
// function Validator (options) {

//     function getParent(element, selector) {
//         while (element.parentElement) {
//             if (element.parentElement.matches(selector)) {
//                 return element.parentElement;
//             }
//             element = element.parentElement;
//         }
//     }
//     var selectorRules = {};


//     // Hàm thực hiện validate
//     function validate(inputElement, rule) {
//         var errorElement = getParent(inputElement, options.formGroupSelector).querySelector(options.errorSelector);
//         var errorMessage;

//         // Lấy ra các rules của selector
//         var rules = selectorRules[rule.selector];

//         // Lặp qua từng rules và kiểm tra
//         // Nếu có lỗi thì dừng việc kiểm tra
//         for ( var i = 0; i < rules.length; ++i) {
//             switch (inputElement.type) {
//                     case 'radio':
//                     case 'checkbox':
//                     errorMessage = rules[i](
//                         formElement.querySelector(rule.selector + ':checked')
//                     );
//                     break;
//                 default:
//                     errorMessage = rules[i](inputElement.value);
//                 }
//                 if (errorMessage) break;  // Nếu có lỗi thì dừng việc kiểm tra

//             }   


//             if (errorMessage) {
//                 errorElement.innerText = errorMessage
//                 getParent(inputElement, options.formGroupSelector).classList.add('invalid');
//             } else {
//                 errorElement.innerText = "";
//                 getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
//             }

//             return !errorMessage;

//     }

//     // Lấy element của form cần validate
//     var formElement = document.querySelector(options.form);

//     if (formElement) {

//         // Khi submit form thì form k submit được
//         formElement.onsubmit = function(e) {


//             var isFormValid = true;

//         // lặp qua từng rules và validate
//         options.rules.forEach(function (rule) {
//             var inputElement = formElement.querySelector(rule.selector);
//             var isValid = validate(inputElement, rule);
//             if (!isValid) {
//                 isFormValid = false;
//             }
//         });



//         if (isFormValid) {
//             // Trường hợp submit với Javascript
//             if (typeof options.onSubmit === 'function' ) {
//                 var enableInputs = formElement.querySelectorAll('[name]');
//                 var formValues = Array.from(enableInputs).reduce(function(values, input) {

//                     switch(input.type) {
//                         case 'radio':
//                             values[input.name] = formElement.querySelector('input[name="' + input.name + '"]:checked').value;
//                             break;
//                         case 'checkbox':
//                             if (!input.matches(':checked')) {
//                                 values[input.name] = [""];
//                                 return values;
//                             }
//                             if (!Array.isArray(values[input.name])) {
//                                 values[input.name] = [];
//                             }
//                             values[input.name].push(input.value);
//                             break;
//                         case 'file':
//                             values[input.name] = input.files;
//                             break;
//                         default:
//                             values[input.name] = input.value;
//                     }

//                     return values;
//                 }, {});

//                 options.onSubmit(formValues);
//             } 
//             // Trường hợp submit với hành vi mặc định
//             else {

//                 formElement.submit();
//             }
//         } 
//     }


//         // Lặp qua mỗi rule và xử lý ( lắng nghe sự kiện blur, input,...)
//         options.rules.forEach (function (rule) {

//             // Lưu lại các rules cho mỗi input
//             if (Array.isArray (selectorRules[rule.selector])) {
//                 selectorRules[rule.selector].push(rule.test);
//             } else {
//                 selectorRules[rule.selector] = [rule.test];
//             }

//             // selectorRules[rule.selector] = rule.test;

//             var inputElements = formElement.querySelectorAll(rule.selector);
//             Array.from(inputElements).forEach(function (inputElement) { 
//                 // Xử lý trường hợp blur khỏi input 
//                     inputElement.onblur = function () {
//                         validate(inputElement, rule);
//                     }

//                     // Xử lý trường hợp mỗi khi người dùng nhập vào input
//                     inputElement .oninput = function() {
//                         var errorElement = getParent(inputElement, options.formGroupSelector).querySelector('.form-message');
//                         errorElement.innerText = '';
//                         getParent(inputElement, options.formGroupSelector).classList.remove('invalid');
//                     } 
//             });
//         });
//     }
// }


// // Định nghĩa các rules
// // Nguyên tắc của rules: 
// // 1. Khi có lỗi  => Trả ra message lỗi
// // 2. Khi hợp lệ => Không trả ra cái gì cả (undefined)
// Validator.isRequired = function (selector, message) {
//     return {a
//         selector: selector,
//         test: function (value) {
//             // Toán tử 3 ngôi : Nếu mà value.trim() k có lỗi thì trả ra undefined: là k có lỗi
//             // còn có lỗi thì trả ra ' Vui lòng nhập trường này '
//             return value ? undefined:  message || 'Vui lòng nhập trường này'

//         }
//     };
// }

// // Định nghĩa các rules
// Validator.isEmail = function (selector, message) {
//      return {
//         selector: selector,
//         test: function (value) {
//             var regex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
//             // Toán tử 3 ngôi: Nếu regex.test nó là email thì trả ra undefined: k có lỗi
//             // còn có lỗi thì trả ra 'Trường này phải là Email'
//             return regex.test(value) ? undefined :  message || 'Trường này phải là Email'
//         }
//     };
// }

// Validator.minLength = function (selector, min, message) {
//      return {
//         selector: selector,
//         test: function (value) {
//             // Toán tử 3 ngôi
//             // Nếu value.length lớn hơn hoặc bằng 6 thì trả ra đúng là undefined,
//             // còn sai thì trả ra `Vui lòng nhập tối thiểu 6 ký tự`
//             return value.length >= min ? undefined :  message || `Vui lòng nhập tối thiểu ${min} kí tự`;
//         }
//     };
// }
// Validator.isConfirmed = function (selector, getConfirmValue, message) {
//     return {
//         selector: selector,
//         test: function (value) {
//             // Toán tử 3 ngôi
//             // Nếu value của chúng ta = với getConfirmValue return thì k có lỗi,
//             // còn nếu mà có lỗi thì 'Giá tri nhập vào k chính xác'
//             return value ===  getConfirmValue() ? undefined : message || 'Giá tri nhập vào không chính xác';
//         }
//     };

// }

const categoryTitle = document.querySelectorAll('.list-category');
const allCategoryPosts = document.querySelectorAll('.all');

for (let i = 0; i < categoryTitle.length; i++) {
    categoryTitle[i].addEventListener('click', filterCategory.bind(this, categoryTitle[i]));
}

function filterCategory(item) {
    changeActivePosition(item);
    for (let i = 0; i < allCategoryPosts.length; i++) {
        if (allCategoryPosts[i].classList.contains(item.attributes.id.value)) {
            allCategoryPosts[i].style.display = "block";
        } else {
            allCategoryPosts[i].style.display = "none";
        }
    }
}

function changeActivePosition(activeItem) {
    for (let i = 0; i < categoryTitle.length; i++) {
        categoryTitle[i].classList.remove('active');
    }
    activeItem.classList.add('active');
};

// Lấy phần tử slider và ảnh
var content = document.querySelector('.content');
var slides = document.querySelectorAll('.slide');

// Thiết lập biến vị trí slide hiện tại
var currentSlide = 0;

// Tự động chuyển đổi slide sau một khoảng thời gian nhất định
var slideInterval = setInterval(nextSlide, 2500);
slides[currentSlide].classList.add('active');
// Tạo hàm để chuyển đổi slide
function nextSlide() {
    // Ẩn slide hiện tại
    slides[currentSlide].classList.remove('active');


    // Tăng vị trí slide
    currentSlide = (currentSlide + 1) % slides.length;

    // Hiển thị slide mới
    slides[currentSlide].classList.add('active');
}

// Dừng chuyển đổi slide khi rê chuột vào slider
content.addEventListener('mouseover', function () {
    clearInterval(slideInterval);
});

// Tiếp tục chuyển đổi slide khi rê chuột ra khỏi slider
content.addEventListener('mouseout', function () {
    slideInterval = setInterval(nextSlide, 2500);
});



////
const Links = document.querySelectorAll('.link')
Links.forEach(link => {
    link.addEventListener('click', function() {
        Links.forEach(btn => btn.classList.remove('active'))
        this.classList.add('active')
    })
})