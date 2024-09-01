'''
用来放置第三方工具：如sqlalchemy
'''

from flask_sqlalchemy import SQLAlchemy
# 导入Mail
from flask_mail import Mail

db = SQLAlchemy()

# 创建mail对象
mail = Mail()