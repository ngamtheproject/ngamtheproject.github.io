---
# Leave the homepage title empty to use the site title
title: ''
date: 2022-10-24
type: landing

sections:
  - block: hero-static
    content:
      title: Ngăm
      text: '**Ngăm** là dự án thiện nguyện được thành lập bởi các bạn học sinh cấp ba với mong muốn được mang lại hạnh phúc cho trẻ Tây Nguyên.'
      media:
        src: albums/2022/10/29/dieu-ngam-luon-mong-uoc.jpg
        alt: Ngăm
    design:
      layout: split-left

  - block: content-collection
    content:
      title: Bài viết gần đây
      text: Cùng điểm lại những tin mới nhất nhé
      count: 5
      filters:
        folders:
          - post
        author: ''
        category: ''
        exclude_featured: false
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
    design:
      view: card
      columns: 1

  - block: content-collection
    content:
      title: Sự kiện đã tổ chức và sắp tới
      text: Cùng nhìn lại những gì Ngăm đã trải qua nhé
      count: 5
      filters:
        folders:
          - event
        author: ''
        category: ''
        exclude_featured: false
        publication_type: ''
        tag: ''
      offset: 0
      order: desc
    design:
      view: card
      columns: 1

  - block: tag-cloud
    content:
      title: Từ khoá phổ biến
      subtitle: ''
      text: "[_Xem tất cả từ khoá_](/tags)"
      # Choose a taxonomy from the `taxonomies` list in `hugo.yaml` to display (e.g. tags, categories, authors)
      taxonomy: tags
      # Choose how many tags you would like to display (0 = all tags)
      count: 20
    design:
      # Minimum and maximum font sizes (1.0 = 100%).
      font_size_min: 0.7
      font_size_max: 2.0
---
