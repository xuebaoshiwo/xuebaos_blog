let button_scorll1 = document.getElementById("scroll-1");
let button_scorll2 = document.getElementById("scroll-2");

// 初始情况在最顶端
let upstair = document.getElementById("form-area1");
upstair.scrollIntoView({
    behavior: 'smooth' // 平滑滚动
});




let body = document.getElementsByTagName('body')[0];




document.getElementById("send verification").addEventListener("click", async (Event) => {
    Event.preventDefault();

    // 是否要将按钮无效
    let isSuccess = false;

    let email = document.getElementById("email").value;
    let username = document.getElementById("username").value;

    // 将正确和错误的图标都隐藏
    let correct_icon = document.getElementById('correct_icon_V')
    let error_icon_1 = document.getElementById('error_icon_V')
    let error_icon_2 = document.getElementById('error_icon_V_usedEmail')
    correct_icon.style.display = 'none';
    error_icon_1.style.display = 'none';
    error_icon_2.style.display = 'none';

    // 先deactivate button
    Event.target.classList.add("deactivated");
    Event.target.disabled = true;  // 禁用按钮


    let package = {
        email: email,
        username: username
    }
    let response = await fetch("http://127.0.0.1:5001/auth/send_mail", {
        method: "POST",
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(package)
    })
        .then(response => response.json())
        .then((data) => {
            if (data.state === true) {
                correct_icon.style.display = 'flex';
                button_scorll2.click();
                isSuccess = true;
            }
            else {
                if (data.error === 'used email') {
                    error_icon_2.style.display = 'flex';
                }
                else {
                    error_icon_1.style.display = 'flex';
                }
            }

        })
        .catch((error) => {
            console.log(error)
        })

        if (isSuccess) {
            Event.target.classList.add('deactivated');
            let second_counter = 60;
            let timerInterval = setInterval(() => {
                second_counter -= 1;
                Event.target.innerHTML = second_counter + 's'
                if (second_counter < 0){
                    Event.target.classList.remove('deactivated');
                    Event.target.disabled = false
                    Event.target.innerHTML = '';
                    clearInterval(timerInterval)
                }
            }, 1000)
        }
        else {
            Event.target.classList.remove('deactivated');
            Event.target.disabled = false;  // 禁用按钮
        }
        


})


document.getElementById("send password").addEventListener("click", async (Event) => {
    Event.preventDefault();
    password = document.getElementById("password").value;
    confirm_password = document.getElementById("confirm password").value;
    email = document.getElementById("email").value;
    username = document.getElementById("username").value;
    code = document.getElementById("code").value;
    let package = {
        code: code,
        password: password,
        confirm_password: confirm_password,
        username: username,
        email: email

    }
    if (password !== confirm_password) {
        alert("你的密码与确定密码不一样！");
    }
    else {
        let response = await fetch("http://127.0.0.1:5001/auth/register", {
            method: "POST",
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(package)
        })
            .then(response => response.json())
            .then((data) => {
                if (data.state === true) {
                    alert("已成功创建账号" + '!')
                }
                else {
                    alert("创建账号失败：" + data.error)
                }

            })
            .catch((error) => {
                console.log(error)
            })
    }

})

button_scorll1.addEventListener('click', () => {
    button_scorll1.classList.add('active');
    button_scorll2.classList.remove('active');
    let upstair = document.getElementById("form-area1");
    upstair.scrollIntoView({
        behavior: 'smooth' // 平滑滚动
    });

})
button_scorll2.addEventListener('click', () => {
    button_scorll1.classList.remove('active');
    button_scorll2.classList.add('active');
    let downstair = document.getElementById("form-area2");
    downstair.scrollIntoView({
        behavior: 'smooth' // 平滑滚动
    });
})