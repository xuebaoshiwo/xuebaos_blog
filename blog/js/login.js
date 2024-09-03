let loginButton = document.getElementById('send login');
let unregisteredError_icon = document.getElementById('error_icon_V');
let emptyError_icon = document.getElementById('error_icon_V_Empty');
let wrongPassword_icon = document.getElementById('error_icon_V_WrongPassword');

// 注册进入按钮
let register_enter = document.getElementById('enter-register');

loginButton.addEventListener('click', async () => {
    let email_input = document.getElementById('email');
    let password_input = document.getElementById('password');
    // 先清空所有错误信息
    unregisteredError_icon.style.display = 'none';
    emptyError_icon.style.display = 'none';
    wrongPassword_icon.style.display = 'none';

    
    // 暂时禁用按钮
    loginButton.disabled = true;

    if (email_input.value === '' || password_input.value === '') {
        email_input.value = ''
        password_input.value = ''
        // 错误提示
        emptyError_icon.style.display = 'flex'
        loginButton.disabled = false; // 解禁按钮
    }
    
    
    
    else {
        
        let pak = {
            email: email_input.value,
            password: password_input.value
        }
        await fetch('http://127.0.0.1:5001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pak)
        })
        .then(response => response.json())
        .then(data => {
            if (!data.state) {
                // 显示相应的错误信息
                if (data.error === 'unregistered email') {
                    unregisteredError_icon.style.display = 'flex';
                    loginButton.disabled = false; // 解禁按钮  
                    register_enter.click();  
                    
                }
                else if (data.error === 'wrong password') {
                    wrongPassword_icon.style.display = 'flex';
                    loginButton.disabled = false; // 解禁按钮
                }
            }
            else {
                // 获取username和userid
                let username = data.username;
                let userid = data.userid;
                window.location.href = `blog.html?username=${username}&userid=${userid}`
                
                // alert("log in successfully!")
            }
        })
        .catch(error => {
            alert(String(error))
        })
    }
})