from flask import Blueprint, request, jsonify
from flask_mail import Message
import random
from exts import mail, db
from models import User

bp = Blueprint("auth", __name__, url_prefix='/auth')




username = ''
email = ''
password = ''
code = 'default_Code'
@bp.route('/send_mail', methods=['POST', 'GET'])
def send_mail():
    # 声明全局变量
    global username, email, password, code


    # 使用request.form.get('name')
    email = request.json.get('email')
    username = request.json.get('username')

    # 查询是否已用该邮箱注册过用户
    users = User.query.filter_by(email=email)
    if users.count() != 0:
        pak = {
            'state': False,
            'code': 'none',
            'error': 'used email'
        }
        return jsonify(pak)


    # 清空验证码
    code = ''
    # 随机生成6位验证码
    for i in range(0, 6):
        unit_code = random.randint(0, 9)
        code += str(unit_code)

    
    # 编写邮件 
    message = Message(subject="flask_mail 测试", recipients=[email], body=f"你的验证码是{code}")
    # 是否发送成功
    state = False
    # 异常情况
    erro = ""
    try:
        # print(message)
        mail.send(message)
        state = True
        print(f"向{email}发送验证码成功")
    except Exception as e:
        state = False
        erro = str(e)
        print(f"向{email}发送验证码失败: {e}")
    
    # 打包返回值
    pak = {
        "state": state,
        "code": code,
        "error": erro
    }

    return jsonify(pak)

@bp.route('/register', methods=['POST', 'GET'])
def verify_code():
    # 声明全局变量
    global username, email, password, code

    password = request.json.get('password')
    email_new = request.json.get('email')
    username_new = request.json.get('username')
    code_new = request.json.get('code')
    result = {}
    print(username)
    print(username_new)
    print(email)
    print(email_new)
    if username != username_new or email != email_new:
        result['state'] = False
        result['error'] = 'You have changed your email or username! Please send a verification code again!'
    elif code_new != code:
        code = 'default_Code'
        result['state'] = False
        result['error'] = 'Verification code error!'
    else:
        code = 'default_Code'
        # 加入数据库
        try:
            user_new = User(user_name=username, password=password, email=email)
            db.session.add(user_new)
            db.session.commit()
            result['error'] = ''
            result['state'] = True
        except Exception as e:
            result['error'] = str(e)
            result['state'] = False
            db.session.rollback()
        
    return jsonify(result)


@bp.route('/login', methods=['GET', 'POST'])
def login():
    email = request.json.get('email')
    password = request.json.get('password')

    # 在数据库里查询是否存在该email注册的用户
    users = User.query.filter_by(email=email)

    # 返回的json
    result = {}
    # state
    state = False
    error = ''
    if users.count() == 0:
        state = False
        error = 'unregistered email'
    else:
        user = users.first()
        correct_password = user.password
        if password == correct_password:
            state = True
            error = ''
        else:
            state = False
            error = 'wrong password'
    result['state'] = state
    result['error'] = error
    return jsonify(result)



