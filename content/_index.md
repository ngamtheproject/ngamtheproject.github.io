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
      image:
        filename: homepage/dieu-ngam-luon-mong-uoc.jpg
      text: |
        <br>
        
        **Ngăm** là dự án thiện nguyện được thành lập bởi các bạn học sinh cấp ba với mong muốn được mang lại hạnh phúc cho trẻ Tây Nguyên.
  
  - block: collection
    content:
      title: Bài viết gần đây
      subtitle: Cùng điểm lại những tin mới nhất nhé
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
      
  - block: collection
    content:
      title: Sự kiện đã tổ chức và sắp tới
      subtitle: Cùng nhìn lại những gì Ngăm đã trải qua nhé
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
      page_type: event
    design:
      view: card
      columns: '1'

  - block: tag_cloud
    content:
      title: Từ khoá phổ biến
      subtitle:
      text: "[_Xem tất cả từ khoá_](/tags)"
      # Choose a taxonomy from the `taxonomies` list in `config.yaml` to display (e.g. tags, categories, authors)
      taxonomy: tags
      # Choose how many tags you would like to display (0 = all tags)
      count: 20
    design:
      # Minimum and maximum font sizes (1.0 = 100%).
      font_size_min: 0.7
      font_size_max: 2.0
---
