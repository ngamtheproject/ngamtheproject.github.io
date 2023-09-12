---
# Leave the homepage title empty to use the site title
title:
date: 2022-10-24
type: landing

sections:
  - block: hero
    content:
      title: |
        Ngăm
#      image:
#        filename: welcome.jpg
      text: |
        <br>
        
        **Ngăm** là dự án thiện nguyện được thành lập bởi các bạn học sinh cấp ba với mong muốn được mang lại hạnh phúc cho trẻ Tây Nguyên.
        
        *Đủ nắng hoa sẽ nở<br>
        Đủ gió chong chóng sẽ quay<br>
        Đủ yêu thương hạnh phúc sẽ đong đầy...*
  
  - block: collection
    content:
      title: Tin mới nhất
      subtitle:
      text:
      count: 5
      filters:
        author: ''
        category: ''
        exclude_featured: false
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
      page_type: post
    design:
      view: card
      columns: '1'
  
#  - block: markdown
#    content:
#      title:
#      subtitle: ''
#      text:
#    design:
#      columns: '1'
#      background:
#        image: 
#          filename: coders.jpg
#          filters:
#            brightness: 1
#          parallax: false
#          position: center
#          size: cover
#          text_color_light: true
#      spacing:
#        padding: ['20px', '0', '20px', '0']
#      css_class: fullscreen
  
  - block: markdown
    content:
      title:
      subtitle:
      text: |
        {{% cta cta_link="./people/" cta_text="Gặp gỡ team →" %}}
    design:
      columns: '1'
---
