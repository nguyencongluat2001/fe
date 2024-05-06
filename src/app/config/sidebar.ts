export const sidebar = [
  // {
  //   title: true,
  //   name: 'Các chức năng',
  //   grant: '1,2,3,4,9,8'
  // },
  {
    name: 'Quản trị hệ thống',
    url: '/users',
    icon: 'fa  fa-cogs fa-hg',
    grant: '1,9',
    children: [
      {
        name: 'Quản trị người dùng',
        url: '/users',
        icon: 'fa fa-angle-double-left fa-lg'
      },
      {
        name: 'Quản trị quyền',
        url: '/users/permission',
        icon: 'fa fa-angle-double-left fa-lg'
      }
    ]
  },
  {
    name: 'Quản trị danh mục',
    url: '/listtype',
    icon: 'fa fa-list fa-hg',
    grant: '1,9',
    children: [
      {
        name: 'Loại danh mục',
        url: '/listtype',
        icon: 'fa fa-angle-double-left fa-lg'
      },
      {
        name: 'Danh mục đối tượng',
        url: '/list',
        icon: 'fa fa-angle-double-left fa-lg'
      }
    ]
  },
  {
    name: 'Quản trị đợt đánh giá',
    url: '/evaluation',
    grant: '1,9',
    icon: 'fa fa-sitemap fa-hg'
  },
  {
    name: 'Thực hiện đánh giá',
    url: '/execute',
    grant: '1,2,3,8,9',
    icon: 'fa fa-pencil-square-o fa-hg'
  },
  {
    name: 'Chấm điểm',
    url: '/markpoint',
    grant: '1,8,9',
    icon: 'fa fa-retweet fa-hg'
  },
  {
    name: 'Duyệt thẩm định',
    url: '/track',
    grant: '1,9',
    icon: 'fa fa-search-plus fa-hg'
  },
  {
    name: 'Tra cứu',
    url: '/search',
    grant: '1,2,8,9',
    icon: 'fa fa-align-justify fa-hg'
  }, {
    name: 'Thông báo',
    url: '/notification',
    grant: '1,2,8,9',
    icon: 'fa fa-bell fa-hg'
  },
];
