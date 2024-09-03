from flask import Blueprint, request
from exts import db, mail



bp = Blueprint("blog", __name__, url_prefix='/blog')

@bp.route('/deliver')
def deliver():
    '''
    期望从前端收到的json文件
    {
        "deliver_id":
        "title": 
        "main_content":
        "subject_tag":
        "language_tag":
        "mainpoint_tag": 
    }
    '''
    # 获得前端信息
    request_json = request.json;
    deliverer_id = request_json.get('deliverer_id')
    title = request_json.get("title")
    main_content = request_json.get("main_content")
    subject_tag = request_json.get("subject_tag")
    language_tag = request_json.get("language_tag")
    mainpoint_tag = request_json.get("mainpoint_tag")

    


