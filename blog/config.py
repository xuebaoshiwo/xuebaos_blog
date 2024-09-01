
'''
用来放置整个项目的文件配置
'''

# sqlalchemy配置信息
HOSTNAME = '127.0.0.1'
PORT = 3306
USERNAME = 'root'
PASSWORD = '200401'
DATABASE = 'mineblog'
DB_URI = f"mysql+pymysql://{USERNAME}:{PASSWORD}@{HOSTNAME}: " \
                                        f"{PORT}/{DATABASE}?charset=utf8mb4"
SQLALCHEMY_DATABASE_URI = DB_URI


# 邮箱配置信息
MAIL_SERVER = 'smtp.qq.com'
MAIL_PORT = '587'
MAIL_USE_TLS = True
MAIL_USERNAME = '2287227024@qq.com'
MAIL_PASSWORD = 'fqahijhldyasecic'
MAIL_DEFAULT_SENDER = '2287227024@qq.com'