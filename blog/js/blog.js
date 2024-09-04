async function main(){    // 获取传递过来参数
    const urlParams = new URLSearchParams(window.location.search)
    const username = urlParams.get('username')
    const userid = urlParams.get('userid')

    // 显示username
    let username_container = document.getElementById('username');
    username_container.innerHTML = username
    getBlogAndShow(1, 6)



    async function getBlogAndShow(page, pieces_of_page = 6) {
        let pak = {
            pieces_started_num: (page - 1) * pieces_of_page,
            pieces_ended_num: page * pieces_of_page
        }
        await fetch('http://127.0.0.1:5001/blog/get_blog', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(pak)
        }).then(response => response.json())
            .then(data => {
                alert(data.state)
                // 解析后端json
                let deliverer_ids = data.deliverer_ids
                let post_ids = data.post_ids
                let titles = data.titles
                let main_contents = data.main_contents
                let subject_tags = data.subject_tags
                let language_tags = data.language_tags
                let mainpoint_tags = data.mainpoint_tags
                let deliver_times = data.deliver_times
                let cover_img_path = data.cover_img_path
                alert(deliverer_ids[0])
            })
            .catch(err => {
                alert(err)
            })
    }

    function add_blog(title, mainContent){
        let blog_piece = document.createElement('span');
        blog_piece.classList.add("blog-piece");
        // 添加hover特效
        blog_piece.classList.add('hvr-grow-shadow');
        // 标题
        let blog_title = document.createElement('span');
        blog_title.classList.add('blog-title');
        blog_title.innerHTML = title;
        // blog-content部分
        let blog_content = document.createElement('span');
        blog_content.classList.add('blog-content');
        // cover-text部分
        let blog_cover_text = document.createElement('span');
        blog_cover_text.classList.add('blog-cover-text');
        // cover图片部分
        let blog_cover_img = document.createElement('span');
        blog_cover_img.classList.add('blog-cover-img');
        // blog_cover_img.style.backgroundImage = 'url(' + 
        
    }

}



main()

