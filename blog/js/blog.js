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
                // alert(data.state)
                // 解析后端json
                let deliverer_ids = data.deliverer_ids
                let post_ids = data.post_ids
                let titles = data.titles
                let main_contents = data.main_contents
                let subject_tags = data.subject_tags
                let language_tags = data.language_tags
                let mainpoint_tags = data.mainpoint_tags
                let deliver_times = data.deliver_times
                let cover_img_paths = data.cover_img_path

                // blogs总数
                let blogs_num = data.blogs_num

                // 计算得到pages总数
                let pages_num = (blogs_num / pieces_of_page) >> 0;

                let length = post_ids.length
                // 先清空blog_container
                let old_blog_pieces = document.getElementsByClassName('blog-piece');
                for (let ele of old_blog_pieces){
                    ele.remove();
                }

                // 添加到前端blog_container
                for (let i = 0; i < length; i++){
                    let title = titles[i];
                    let mainContent = main_contents[i];
                    let cover_img_path = cover_img_paths[i];
                    let mainContentMaxLength = mainContent.length;
                    let coverLength = mainContentMaxLength < 300 ? mainContentMaxLength : 300;
                    let coverMainContent = mainContent.slice(0, coverLength); 
                    add_blog(title, coverMainContent, cover_img_path);
                }

                // 添加分页器
                addPagenation(page, pages_num)

            })
            // .catch(err => {
            //     alert(err)
            // })
    }

    function add_blog(title, coverMainContent, cover_img_path){
        let blog_piece = document.createElement('span');
        blog_piece.classList.add("blog-piece");
        // 添加hover特效
        blog_piece.classList.add('mine-shadow-hover');
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
        blog_cover_text.innerHTML = coverMainContent;
        // cover图片部分
        let blog_cover_img = document.createElement('span');
        blog_cover_img.classList.add('blog-cover-img');
        blog_cover_img.style.backgroundImage = 'url(' + `'` + cover_img_path + `'` +')';
        
        blog_content.appendChild(blog_cover_text);
        blog_content.appendChild(blog_cover_img);

        blog_piece.appendChild(blog_title);
        blog_piece.append(blog_content);

        // 获得blog_container
        let blog_container = document.getElementById('blog-container-1');

        // 加入到blog_container 
        blog_container.appendChild(blog_piece);
    }

    // 加入分页器
    async function addPagenation(page, pages_num){
        let pagenation = document.getElementById('blog-pagenation');
        let page_button_list = document.getElementsByClassName('page_button');
        // 先移除所有page+button
        for (let i = 0; i < page_button_list.length; i++){
            page_button_list[i].remove();
        }
        // 当前页面所在页码
        let standard_page_button;
        // 再加入新的page_button
        alert(pages_num)
        // 获得page_button_container
        let page_button_container = document.getElementById('page_button_container');

        for (let i = 0; i < pages_num; i++){
            // create一个新的page_button
            let page_button = document.createElement('span');
            page_button.classList.add('page_button');
            page_button.innerHTML = i + 1;
            if (i + 1 === page){
                standard_page_button = page_button;
            }

            // 绑定event
            page_button.addEventListener('click', async (event, i) => {
                // d递归调用getBlogAndShow
                getBlogAndShow(i + 1, 6);
            })

            // 加入到page_button_container中
            page_button_container.appendChild(page_button);


        }
        // 置顶到当前页面
        // standard_page_button.scrollIntoView({
        //     behavior: 'smooth' // 平滑滚动
        // });
        
    }

}



main()