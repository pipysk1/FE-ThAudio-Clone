import icons from './icons';

const {
  FaBolt,
  FaBook,
  FaCloud,
  FaDatabase,
  FaStackExchange,
  MdRefresh,
  FaPlus,
  FaHome,
  FaFilter,
  MdDiamond,
  FaHistory,
  FaSwatchbook,
  AiFillMessage,
} = icons;

export const menu = [
  {
    path: '',
    text: 'Thể loại',
    icon: FaBook,
    show: FaPlus,
    child: [
      {
        path: '',
        text: 'Tất cả',
      },
      {
        path: '',
        text: 'Tiên hiệp',
      },
      {
        path: '',
        text: 'Huyền Huyễn',
      },
      {
        path: '',
        text: 'Hệ thống',
      },
      {
        path: '',
        text: 'Đô thị',
      },
      {
        path: '',
        text: 'Sắc hiệp',
      },
      {
        path: '',
        text: 'Đồng nhân',
      },
      {
        path: '',
        text: 'Khoa Huyễn',
      },
      {
        path: '',
        text: 'Mạt Thế',
      },
      {
        path: '',
        text: 'Võng du',
      },
    ],
  },
  {
    path: '',
    text: 'Bảng Xếp Hạng',
    icon: FaBolt,
    show: FaPlus,
    child: [
      {
        path: '',
        text: 'Theo Thời Gian',
      },
      {
        path: '',
        text: 'Theo thể loại',
      },
      {
        path: '',
        text: 'Đánh giá/Yêu Thích',
      },
    ],
  },
  {
    path: '',
    text: 'Truyện Full',
    icon: FaDatabase,
  },
  {
    path: '',
    text: 'Truyện dịch',
    icon: FaStackExchange,
  },
  {
    path: '',
    text: 'Ngẫu nhiên',
    icon: MdRefresh,
  },
  {
    path: '',
    text: 'Truyện SV',
    icon: FaCloud,
  },
];

export const navItems = [
  { icon: FaHome, label: 'Home' },
  { icon: FaBolt, label: 'TOP' },
  { icon: FaFilter, label: 'Bộ lọc' },
  { icon: MdDiamond, label: 'VIP' },
  { icon: FaHistory, label: 'Đã nghe' },
  { icon: FaSwatchbook, label: 'Tủ truyện' },
  { icon: AiFillMessage, label: 'GROUP' },
];
