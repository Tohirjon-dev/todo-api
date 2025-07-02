
USER UCHUN API LAR

1

Post => https://todo-api-q9q5.onrender.com/auth/register 
foydalanuvchi registrasiyadan o'tishi uchun , agar allaqachon o'tgan bo'lsa xatolik qaytariladi,dto ham yozilgan 

body dan yuborish uchun 

fullname => kamida 2 ta kopi bilan 72 belgi
email  => email @gmail.com bilan tugashi kerak
password   => parol kamida 4 ta kopi bilan 16 ta belgi (string bo'lishi kerak)

Test uchun 3 ta user qo'shamiz

{
    "fullname":"Alisher",           
    "email":"ali@gmail.com",        
    "password":"Hello"              
}

{
    "fullname":"Davron",           
    "email":"davron@gmail.com",        
    "password":"abcd"              
}

{
    "fullname":"Sardor",           
    "email":"sardor@gmail.com",        
    "password":"7777"              
}

2.

Post => https://todo-api-q9q5.onrender.com/auth/login

Body dan yuborish 
{
"email":"sardor@gmail.com",        
"password":"7777"  
}

Bu xolatda bizga refresh va access tokenlar beriladi,ularni cookiega yozib qo'ydim
Agar access muddati tugagan bo'lsa lekin refresh tugamagan bolsa, authGuard avtomatik yangi access yaratadi va sorov yuborishda xatolik chiqmaydi
Bu refresh deb alohida api chiqarishni oldini oladi yani ishimiz kamayadi

3

Get => https://todo-api-q9q5.onrender.com/auth/me

Bu acces token orqali bizning malumotlarimizni olib beradi


4

Put => https://todo-api-q9q5.onrender.com/auth/login

Body dan yuborish uchun

{
    "fullname":"Test",
    "email":"test@gmail.com",
    "password":"ssss"
}

Bu sorovda biz profilimizni update qilsak boladi, dto da hammasi optional yani hohlasak 2 ta malumot ozgartiramiz hohlasak hammasini kamida bittasini o'zgartirish kerak



5

Post => https://todo-api-q9q5.onrender.com/tasks

Foydalanuvchi task yaratishi uchun , authGuard bilan himoyalangan,oldin login qilib olishi shart

Body dan yuborish uchun

{
    "title":"Kitob o'qish",
    "description":"1 soat davomida 20 bet kitob o'qish"
}


6

Get =>  https://todo-api-q9q5.onrender.com/tasks

Foydalanuvchining barcha tasklarini olib beradi




7

Get  => https://todo-api-q9q5.onrender.com/auth/logout

tizimdan chiqish uchun api, refresh va access tokenlarni cookiedan o'chirib yuboradi



SUPERADMIN UCHUN API LAR

Eslatma: Bu sorovdan oldin super-admin login qilib olishi kerak 

{
    "email":"tohirjonmuqimov79@gmail.com",
    "password":"1234"
}

Patch => https://todo-api-q9q5.onrender.com/super-admin/id  
id idli userni ADMIN roliga tayinlash uchun , faqat SUPERADMIN bajara oladi


ADMIN UCHUN API LAR

Eslatma: Bu sorovlardan oldin admin login qilib olishi kerak


1

GET => https://todo-api-q9q5.onrender.com/admin/users 
tizimdagi barcha userlarni olib beradi , Admin va superadmin bajara oladi


2

GET => https://todo-api-q9q5.onrender.com/admin/users/id
id idli foydalanuvchini olib beradi

3

Patch  => https://todo-api-q9q5.onrender.com/admin/users/id
Bu api userni id si orqali qidirib userning parolini o'zgartirib beradi

Bodydan yuborish uchun
{
    "password":"no password"
}


4


Delete   => https://todo-api-q9q5.onrender.com/admin/users/id

id idli userni bazadan o'chirib yuboradi