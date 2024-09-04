from time import sleep
from models import Blog, User
from flask import Flask, Blueprint
from exts import db
bp = Blueprint('Test', __name__, url_prefix='/test')

@bp.route('/insert_test_blog', methods=['GET', 'POST'])
def insert_test_blog():
    number = 20
    for i in range(0, number):
        blog = Blog(deliverer_id=4, title=f'Test Blog {i}', 
                    main_content='Flask 是一个使用 Python 编写的轻量级 Web 应用框架，广泛用于开发 Web 应用和服务。自 2010 年首次发布以来，Flask 因其简洁而灵活的设计获得了开发者的广泛喜爱。Flask 的核心理念是提供一个简单而功能强大的基础，使开发者能够自由地选择所需的库和工具。它不像一些大型框架那样捆绑了很多默认的功能，而是允许开发者根据具体需求添加扩展。这种灵活性使得 Flask 非常适合构建各种规模的应用，从简单的个人项目到复杂的企业级系统。', 
                    cover_img_path=r'../static/blogCover-img/e4dca241f6054f75b2b07ea211cce916.png',
                    subject_tag='后端开发',
                    language_tag='python',
                    mainpoint_tag='flask')
        sleep(1)
        db.session.add(blog)
        db.session.commit()
        print(f'第{i}条test blog 已经插入')
    return "Test blog插入成功"