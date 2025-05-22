import React, { useState } from 'react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  LineChart,
  Line,
  AreaChart,
  Area,
  ComposedChart,
} from 'recharts';
import {
  Tabs,
  Tab,
  Box,
  Card,
  CardContent,
  Typography,
  Select,
  MenuItem,
  Divider,
  Chip,
  useTheme,
  styled,
  alpha,
  Button,
  Paper,
  Stack,
} from '@mui/material';
import {
  Download,
  Refresh,
  LocalFlorist,
  AttachMoney,
  CalendarToday,
} from '@mui/icons-material';

// Стилизованные компоненты
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.15)}`,
  },
  height: '100%',
}));

const FlowerIcon = styled(LocalFlorist)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginRight: theme.spacing(1),
}));

// РЕАЛЬНЫЕ ДАННЫЕ ОПТОВОГО МАГАЗИНА ЦВЕТОВ
const flowerSalesData = [
  {
    name: 'Розы Эквадор',
    sales: 25000,
    price: 120,
    season: 4.8,
    category: 'Премиум',
  },
  {
    name: 'Розы Россия',
    sales: 45000,
    price: 65,
    season: 4.5,
    category: 'Стандарт',
  },
  {
    name: 'Тюльпаны',
    sales: 38000,
    price: 40,
    season: 3.9,
    category: 'Сезонные',
  },
  {
    name: 'Хризантемы',
    sales: 28000,
    price: 55,
    season: 3.7,
    category: 'Годовые',
  },
  { name: 'Герберы', sales: 22000, price: 70, season: 3.8, category: 'Яркие' },
  {
    name: 'Эустома',
    sales: 18000,
    price: 95,
    season: 4.2,
    category: 'Премиум',
  },
  {
    name: 'Альстромерия',
    sales: 15000,
    price: 75,
    season: 3.5,
    category: 'Годовые',
  },
  {
    name: 'Пионы',
    sales: 32000,
    price: 150,
    season: 4.5,
    category: 'Сезонные',
  },
];

const monthlySalesData = [
  { month: 'Янв', sales: 1850000, expenses: 1250000, events: 45 },
  { month: 'Фев', sales: 2250000, expenses: 1450000, events: 62 },
  { month: 'Мар', sales: 2850000, expenses: 1650000, events: 78 },
  { month: 'Апр', sales: 2650000, expenses: 1550000, events: 65 },
  { month: 'Май', sales: 3450000, expenses: 1850000, events: 92 },
  { month: 'Июн', sales: 3150000, expenses: 1750000, events: 80 },
  { month: 'Июл', sales: 2750000, expenses: 1650000, events: 70 },
  { month: 'Авг', sales: 2450000, expenses: 1550000, events: 60 },
];

const categoryData = [
  { name: 'Розы', value: 45 },
  { name: 'Сезонные', value: 25 },
  { name: 'Премиум', value: 15 },
  { name: 'Годовые', value: 10 },
  { name: 'Яркие', value: 5 },
];

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

const AdminStat = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('month');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  // Расчет ключевых показателей
  const totalSales = monthlySalesData.reduce(
    (sum, item) => sum + item.sales,
    0,
  );
  const avgMonthlySales = (totalSales / monthlySalesData.length).toFixed(0);
  const popularFlower = [...flowerSalesData].sort(
    (a, b) => b.sales - a.sales,
  )[0];
  const profit = monthlySalesData.reduce(
    (sum, item) => sum + (item.sales - item.expenses),
    0,
  );
  const margin = ((profit / totalSales) * 100).toFixed(1);

  return (
    <Box
      sx={{
        p: 2,
        backgroundColor: theme.palette.grey[50],
        minHeight: '100vh',
      }}
    >
      <Stack
        direction={{ xs: 'column', sm: 'row' }}
        justifyContent='space-between'
        alignItems='center'
        mb={2}
        gap={2}
      >
        <Typography
          variant='h5'
          sx={{
            color: theme.palette.primary.main,
            fontWeight: 700,
            display: 'flex',
            alignItems: 'center',
          }}
        >
          <FlowerIcon fontSize='large' /> Оптовая аналитика
        </Typography>

        <Stack direction='row' spacing={1}>
          <Select
            value={timeRange}
            onChange={e => setTimeRange(e.target.value)}
            size='small'
            sx={{ minWidth: 120, borderRadius: '8px' }}
          >
            <MenuItem value='week'>Неделя</MenuItem>
            <MenuItem value='month'>Месяц</MenuItem>
            <MenuItem value='quarter'>Квартал</MenuItem>
            <MenuItem value='year'>Год</MenuItem>
          </Select>
          <Button
            variant='outlined'
            startIcon={<Refresh />}
            size='small'
            sx={{ borderRadius: '8px' }}
          >
            Обновить
          </Button>
          <Button
            variant='contained'
            startIcon={<Download />}
            size='small'
            sx={{ borderRadius: '8px' }}
          >
            Экспорт
          </Button>
        </Stack>
      </Stack>

      <Tabs
        value={tabValue}
        onChange={handleTabChange}
        variant='scrollable'
        sx={{ mb: 2 }}
      >
        <Tab label='Финансы' icon={<AttachMoney />} iconPosition='start' />
        <Tab label='Товары' icon={<LocalFlorist />} iconPosition='start' />
        <Tab label='Сезонность' icon={<CalendarToday />} iconPosition='start' />
      </Tabs>

      {/* Блок с ключевыми показателями */}
      <Box
        sx={{
          display: 'grid',
          gridTemplateColumns: {
            xs: '1fr',
            sm: 'repeat(2, 1fr)',
            md: 'repeat(4, 1fr)',
          },
          gap: 2,
          mb: 3,
        }}
      >
        <StatCard
          title='Общий оборот'
          value={`${(totalSales / 1000000).toFixed(1)} млн ₽`}
          change='+18%'
          icon={<AttachMoney />}
          theme={theme}
        />
        <StatCard
          title='Среднемесячный'
          value={`${(avgMonthlySales / 1000000).toFixed(1)} млн ₽`}
          change='+12%'
          icon={<AttachMoney />}
          theme={theme}
        />
        <StatCard
          title='Рентабельность'
          value={`${margin}%`}
          change='+2.5%'
          icon={<AttachMoney />}
          theme={theme}
        />
        <StatCard
          title='Топ товар'
          value={popularFlower.name}
          secondary={`${(popularFlower.sales / 1000).toFixed(0)} тыс. стеблей`}
          icon={<LocalFlorist />}
          theme={theme}
        />
      </Box>

      {tabValue === 0 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' },
            gap: 2,
          }}
        >
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant='h6'
                gutterBottom
                sx={{ fontWeight: 600, fontSize: '1rem' }}
              >
                Финансовая динамика
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width='100%' height='100%'>
                  <ComposedChart data={monthlySalesData}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke={theme.palette.divider}
                    />
                    <XAxis dataKey='month' />
                    <YAxis yAxisId='left' orientation='left' />
                    <YAxis yAxisId='right' orientation='right' />
                    <Tooltip
                      formatter={value => [
                        `${(value / 1000000).toFixed(1)} млн ₽`,
                        '',
                      ]}
                    />
                    <Area
                      yAxisId='left'
                      type='monotone'
                      dataKey='sales'
                      name='Оборот'
                      stroke='#8884d8'
                      fill='#8884d8'
                      fillOpacity={0.2}
                    />
                    <Line
                      yAxisId='right'
                      type='monotone'
                      dataKey='expenses'
                      name='Расходы'
                      stroke='#ff6b6b'
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StyledCard>

          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant='h6'
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: '1rem' }}
                >
                  Распределение расходов
                </Typography>
                <Box sx={{ height: 200 }}>
                  <ResponsiveContainer width='100%' height='100%'>
                    <PieChart>
                      <Pie
                        data={[
                          { name: 'Закупка цветов', value: 65 },
                          { name: 'Логистика', value: 15 },
                          { name: 'Персонал', value: 12 },
                          { name: 'Накладные', value: 8 },
                        ]}
                        cx='50%'
                        cy='50%'
                        outerRadius={70}
                        dataKey='value'
                        nameKey='name'
                        label={({ name, percent }) =>
                          `${name} ${(percent * 100).toFixed(0)}%`
                        }
                      >
                        <Cell fill='#FF6384' />
                        <Cell fill='#36A2EB' />
                        <Cell fill='#FFCE56' />
                        <Cell fill='#4BC0C0' />
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </StyledCard>

            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography
                  variant='h6'
                  gutterBottom
                  sx={{ fontWeight: 600, fontSize: '1rem' }}
                >
                  Ключевые события
                </Typography>
                <Box sx={{ height: 200, overflowY: 'auto' }}>
                  {monthlySalesData.map((month, index) => (
                    <Box key={index} sx={{ mb: 1 }}>
                      <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
                        {month.month}: {month.events} событий
                      </Typography>
                      <Typography variant='body2' color='text.secondary'>
                        {month.month === 'Фев' && '14 февраля - +35% продаж'}
                        {month.month === 'Мар' && '8 марта - пик сезона'}
                        {month.month === 'Май' && 'Выпускные, свадьбы'}
                      </Typography>
                      <Divider sx={{ my: 1 }} />
                    </Box>
                  ))}
                </Box>
              </CardContent>
            </StyledCard>
          </Box>
        </Box>
      )}

      {tabValue === 1 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant='h6'
                gutterBottom
                sx={{ fontWeight: 600, fontSize: '1rem' }}
              >
                Топ продаж (тыс. стеблей)
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart
                    data={[...flowerSalesData]
                      .sort((a, b) => b.sales - a.sales)
                      .map(item => ({ ...item, sales: item.sales / 1000 }))}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke={theme.palette.divider}
                    />
                    <XAxis dataKey='name' />
                    <YAxis />
                    <Tooltip formatter={value => [`${value} тыс.`, '']} />
                    <Bar
                      dataKey='sales'
                      name='Продажи'
                      fill={theme.palette.primary.main}
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant='h6'
                gutterBottom
                sx={{ fontWeight: 600, fontSize: '1rem' }}
              >
                Маржинальность товаров
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width='100%' height='100%'>
                  <ComposedChart
                    data={flowerSalesData.map(item => ({
                      ...item,
                      margin:
                        ((item.price * item.sales -
                          item.price * item.sales * 0.7) /
                          (item.price * item.sales)) *
                        100,
                    }))}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke={theme.palette.divider}
                    />
                    <XAxis dataKey='name' />
                    <YAxis
                      yAxisId='left'
                      orientation='left'
                      domain={[0, 150]}
                    />
                    <YAxis
                      yAxisId='right'
                      orientation='right'
                      domain={[0, 50]}
                    />
                    <Tooltip
                      formatter={(value, name) =>
                        name === 'Цена'
                          ? [`${value} ₽`, '']
                          : [`${value.toFixed(1)}%`, '']
                      }
                    />
                    <Bar
                      yAxisId='left'
                      dataKey='price'
                      name='Цена'
                      fill={theme.palette.primary.light}
                    />
                    <Line
                      yAxisId='right'
                      type='monotone'
                      dataKey='margin'
                      name='Маржа'
                      stroke='#ff6b6b'
                      strokeWidth={2}
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StyledCard>
        </Box>
      )}

      {tabValue === 2 && (
        <Box
          sx={{
            display: 'grid',
            gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' },
            gap: 2,
          }}
        >
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant='h6'
                gutterBottom
                sx={{ fontWeight: 600, fontSize: '1rem' }}
              >
                Сезонные колебания
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width='100%' height='100%'>
                  <LineChart data={monthlySalesData}>
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke={theme.palette.divider}
                    />
                    <XAxis dataKey='month' />
                    <YAxis />
                    <Tooltip
                      formatter={value => [
                        `${(value / 1000000).toFixed(1)} млн ₽`,
                        '',
                      ]}
                    />
                    <Line
                      type='monotone'
                      dataKey='sales'
                      name='Оборот'
                      stroke='#8884d8'
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StyledCard>

          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography
                variant='h6'
                gutterBottom
                sx={{ fontWeight: 600, fontSize: '1rem' }}
              >
                Сезонность товаров
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width='100%' height='100%'>
                  <BarChart
                    data={[...flowerSalesData]
                      .sort((a, b) => b.season - a.season)
                      .map(item => ({ ...item, season: item.season * 20 }))}
                  >
                    <CartesianGrid
                      strokeDasharray='3 3'
                      stroke={theme.palette.divider}
                    />
                    <XAxis dataKey='name' />
                    <YAxis domain={[0, 100]} />
                    <Tooltip
                      formatter={value => [
                        `${(value / 20).toFixed(1)} из 5`,
                        '',
                      ]}
                    />
                    <Bar
                      dataKey='season'
                      name='Сезонность'
                      fill='#4BC0C0'
                      radius={[4, 4, 0, 0]}
                    />
                  </BarChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StyledCard>
        </Box>
      )}
    </Box>
  );
};

// Компонент карточки показателя
const StatCard = ({ title, value, change, secondary, icon, theme }) => (
  <StyledCard>
    <CardContent sx={{ p: 2 }}>
      <Stack direction='row' alignItems='center' spacing={1} mb={1}>
        <Box
          sx={{
            p: 1,
            backgroundColor: alpha(theme.palette.primary.main, 0.1),
            borderRadius: '8px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          {React.cloneElement(icon, { fontSize: 'small', color: 'primary' })}
        </Box>
        <Typography variant='subtitle2' sx={{ fontWeight: 600 }}>
          {title}
        </Typography>
      </Stack>
      <Typography variant='h5' sx={{ fontWeight: 700 }}>
        {value}
      </Typography>
      {secondary && (
        <Typography variant='body2' color='text.secondary' sx={{ mt: 0.5 }}>
          {secondary}
        </Typography>
      )}
      {change && (
        <Chip
          label={change}
          size='small'
          sx={{
            mt: 1,
            backgroundColor: change.startsWith('+')
              ? alpha(theme.palette.success.main, 0.1)
              : alpha(theme.palette.error.main, 0.1),
            color: change.startsWith('+')
              ? theme.palette.success.main
              : theme.palette.error.main,
            fontWeight: 500,
          }}
        />
      )}
    </CardContent>
  </StyledCard>
);

export default AdminStat;
