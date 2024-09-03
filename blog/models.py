from exts import db
from datetime import datetime

# 用户信息
class User(db.Model):
    __tablename__ = "user"
    id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    user_name = db.Column(db.String(100), nullable=False)
    password = db.Column(db.String(100), nullable=False)
    email = db.Column(db.String(100), nullable=False, unique=True)
    join_time = db.Column(db.DateTime, nullable=False, default=datetime.now)

    # 设置外键

    
# blog
class Blog(db.Model):
    __tablename__ = 'blog'
    # post_id 为blog的主键
    post_id = db.Column(db.Integer, primary_key=True, autoincrement=True)
    # 发送者的id, 为到User的id的外键
    deliverer_id = db.Column(db.Integer, db.ForeignKey("user.id"), nullable=False)
    # 在USer中可以使用blog来访问其绑定的blog
    deliverer = db.relationship(User, backhref='blog')
    # blog标题
    title = db.Column(db.String(100), nullable=False)
    # 正文内容
    main_content = db.Column(db.Text)
    # tag部分
    subject_tag = db.Column(db.String(100))
    language_tag = db.Column(db.String(100))
    mainpoint_tag = db.Column(db.String(100))
    # 发送时间
    deliver_time = db.Column(db.Integer, nullable=False, default=datetime.now)



