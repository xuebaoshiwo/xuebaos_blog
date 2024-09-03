from flask import Flask, request, jsonify
import random
import config
from blueprints.auth import bp as auth_bp
from blueprints.blog import bp as blog_bp
from exts import db, mail
from flask_migrate import Migrate
from models import User
from flask_cors import CORS
from flask_mail import Message

app = Flask(__name__)

# 使得前后端二者可以在同一台计算机上运行
CORS(app)

# 登记config
app.config.from_object(config)

# 登记蓝图
app.register_blueprint(auth_bp)
app.register_blueprint(blog_bp)

# 登记SQLAlchemy
db.init_app(app)
# 登记邮箱
mail.init_app(app)

# 登记Migrate
migrate = Migrate(app, db)

@app.route('/', methods=['POST'])
def func():
    print("01201201")
    
    # # 使用request.form.get('name')
    # email = request.json.get('email')
    # # 随机生成6位验证码
    # code = ""
    # for i in range(0, 6):
    #     unit_code = random.randint(0, 9)
    #     code += str(unit_code)

    
    # # 编写邮件 
    # message = Message(subject="flask_mail 测试", recipients=[email], body=f"你的验证码是{code}")
    # # 是否发送成功
    # state = False
    # # 异常情况
    # erro = ""
    # try:
    #     # print(message)
    #     mail.send(message)
    #     state = True
    #     print(f"向{email}发送验证码成功")
    # except Exception as e:
    #     state = False
    #     erro = str(e)
    #     print(f"向{email}发送验证码失败: {e}")
    
    # 打包返回值
    pak = {
        "state": True,
    }

    return jsonify(pak)


if __name__ == '__main__':
    app.run( port="5001" ,debug=True)
