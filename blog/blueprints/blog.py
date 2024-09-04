from flask import Blueprint, request, jsonify
from exts import db, mail
from models import User, Blog



bp = Blueprint("blog", __name__, url_prefix='/blog')

@bp.route('/get_blog', methods=['GET', 'POST'])
def get_blog():
    '''
    期望从前端收到的json文件
    pak = {
        pieces_started_num: (page - 1) *  pieces_of_page,
        pieces_ended_num: page * pieces_of_page
    } 
    '''
    # 获得前端信息
    pieces_started_num = request.json.get('pieces_started_num')
    pieces_ended_num = request.json.get('pieces_ended_num')

    # state 获取数据是否成功
    state = False
    # error 存储返回的错误信息
    error = ''
    # 最后返回的json文件
    result = {}

    # 获得数据库中的blog数据
    try:
        blogs = Blog.query.order_by('deliver_time').all()
        max_length = len(blogs)
        # 获得blogs总数
        blogs_num = max_length
        # 如果下界大于max_length则直接返回
        if int(pieces_started_num) >=max_length:
            return jsonify({'state': False, 'error': 'out of index range!'})
        
        # 如果上界大于max_length则将max_length - 1置为上界
        if int(pieces_ended_num) >= max_length:
            pieces_ended_num = max_length

        # 将blogs按上下界切片
        ret_blogs_list = blogs[int(pieces_started_num): int(pieces_ended_num)]

        # deliver_id 的列表
        deliverer_ids = []
        # post_id的列表
        post_ids = []
        # title列表
        titles = []
        # main_content正文的列表
        main_contents = []
        # tag 列表
        subject_tags = []
        language_tags = []
        mainpoint_tags = []
        deliver_times = []
        # 封面图片路径
        cover_img_paths = []

        for blog in ret_blogs_list:
            deliverer_ids.append(blog.deliverer_id)
            post_ids.append(blog.post_id)
            titles.append(blog.title)
            main_contents.append(blog.main_content)
            subject_tags.append(blog.subject_tag)
            language_tags.append(blog.language_tag)
            mainpoint_tags.append(blog.mainpoint_tag)
            deliver_times.append(blog.deliver_time)
            cover_img_paths.append(blog.cover_img_path)  # 封面图片路径
        
        # 包装result
        result['error'] = error
        result['deliverer_ids'] = deliverer_ids
        result['post_ids'] = post_ids
        result['titles'] = titles
        result['main_contents'] = main_contents
        result['subject_tags'] = subject_tags
        result['language_tags'] = language_tags
        result['mainpoint_tags'] = mainpoint_tags
        result['deliver_times'] = deliver_times
        result['cover_img_path'] = cover_img_paths
        # blog总数
        result['blogs_num'] = blogs_num
        # state置为True
        state = True
        result['state'] = state


        return jsonify(result)

    except Exception as e:
        print(str(e))
        error = str(e)
        result['state'] = state
        result['error'] = error
        return jsonify(result)
    

    


