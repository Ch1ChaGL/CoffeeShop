import React, { useState } from 'react';
import {
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer,
  PieChart, Pie, Cell, LineChart, Line, AreaChart, Area, ComposedChart
} from 'recharts';
import { 
  Tabs, Tab, Box, Card, CardContent, Typography, Select, MenuItem, 
  Divider, Chip, useTheme, styled, alpha, Button, Paper, Stack
} from '@mui/material';
import { Download, Refresh, LocalFlorist, AttachMoney, CalendarToday } from '@mui/icons-material';

// Стилизованные компоненты
const StyledCard = styled(Card)(({ theme }) => ({
  borderRadius: '12px',
  boxShadow: `0 4px 12px ${alpha(theme.palette.primary.main, 0.1)}`,
  transition: 'transform 0.2s',
  '&:hover': {
    transform: 'translateY(-2px)',
    boxShadow: `0 6px 16px ${alpha(theme.palette.primary.main, 0.15)}`
  },
  height: '100%'
}));

const FlowerIcon = styled(LocalFlorist)(({ theme }) => ({
  color: theme.palette.primary.main,
  marginRight: theme.spacing(1)
}));

// Данные для отчетов
const flowerSalesData = [
  { name: 'Розы', sales: 120, price: 150, season: 4.5, category: 'Классические' },
  { name: 'Тюльпаны', sales: 95, price: 80, season: 3.8, category: 'Весенние' },
  { name: 'Пионы', sales: 75, price: 200, season: 4.2, category: 'Сезонные' },
  { name: 'Хризантемы', sales: 60, price: 100, season: 3.5, category: 'Годовые' },
  { name: 'Орхидеи', sales: 45, price: 300, season: 4.0, category: 'Экзотические' },
  { name: 'Герберы', sales: 50, price: 120, season: 3.7, category: 'Яркие' },
];

const monthlySalesData = [
  { month: 'Янв', sales: 120000, expenses: 80000, events: 15 },
  { month: 'Фев', sales: 135000, expenses: 85000, events: 18 },
  { month: 'Мар', sales: 180000, expenses: 90000, events: 25 },
  { month: 'Апр', sales: 160000, expenses: 85000, events: 22 },
  { month: 'Май', sales: 220000, expenses: 100000, events: 30 },
  { month: 'Июн', sales: 240000, expenses: 110000, events: 32 },
];

const categoryData = [
  { name: 'Классические', value: 35 },
  { name: 'Сезон', value: 25 },
  { name: 'Экзотические', value: 15 },
  { name: 'Годовые', value: 15 },
  { name: 'Яркие', value: 10 },
];

const COLORS = ['#FF6384', '#36A2EB', '#FFCE56', '#4BC0C0', '#9966FF'];

const AdminStat = () => {
  const theme = useTheme();
  const [tabValue, setTabValue] = useState(0);
  const [timeRange, setTimeRange] = useState('month');

  const handleTabChange = (event, newValue) => {
    setTabValue(newValue);
  };

  const totalSales = flowerSalesData.reduce((sum, item) => sum + item.sales * item.price, 0);
  const avgPrice = (flowerSalesData.reduce((sum, item) => sum + item.price, 0) / flowerSalesData.length).toFixed(0);
  const popularFlower = [...flowerSalesData].sort((a, b) => b.sales - a.sales)[0];

  return (
    <Box sx={{ 
      p: 2,
      backgroundColor: theme.palette.grey[50],
      minHeight: '100vh'
    }}>
      <Stack direction={{ xs: 'column', sm: 'row' }} justifyContent="space-between" alignItems="center" mb={2} gap={2}>
        <Typography variant="h5" sx={{ 
          color: theme.palette.primary.main,
          fontWeight: 700,
          display: 'flex',
          alignItems: 'center'
        }}>
          <FlowerIcon fontSize="large" /> Аналитика магазина
        </Typography>
        
        <Stack direction="row" spacing={1}>
          <Button 
            variant="outlined" 
            startIcon={<Refresh />}
            size="small"
            sx={{ borderRadius: '8px' }}
          >
            Обновить
          </Button>
          <Button 
            variant="contained" 
            startIcon={<Download />}
            size="small"
            sx={{ borderRadius: '8px' }}
          >
            Экспорт
          </Button>
        </Stack>
      </Stack>
      
      <Tabs 
        value={tabValue} 
        onChange={handleTabChange}
        variant="scrollable"
        sx={{ mb: 2 }}
      >
        <Tab label="Продажи" icon={<AttachMoney />} iconPosition="start" />
        <Tab label="Ассортимент" icon={<LocalFlorist />} iconPosition="start" />
        <Tab label="Сезонность" icon={<CalendarToday />} iconPosition="start" />
      </Tabs>
      
      <Box sx={{ mb: 2 }}>
        <Select
          value={timeRange}
          onChange={(e) => setTimeRange(e.target.value)}
          size="small"
          sx={{ minWidth: 120, borderRadius: '8px' }}
        >
          <MenuItem value="week">Неделя</MenuItem>
          <MenuItem value="month">Месяц</MenuItem>
          <MenuItem value="quarter">Квартал</MenuItem>
          <MenuItem value="year">Год</MenuItem>
        </Select>
      </Box>

      {tabValue === 0 && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '2fr 1fr' }, gap: 2 }}>
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Динамика продаж
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <AreaChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Area 
                      type="monotone" 
                      dataKey="sales" 
                      name="Продажи (₽)" 
                      stroke="#8884d8" 
                      fill="#8884d8" 
                      fillOpacity={0.2}
                    />
                  </AreaChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StyledCard>
          
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
                  Ключевые показатели
                </Typography>
                <Stack spacing={1}>
                  <StatItem 
                    label="Общие продажи" 
                    value={`${(totalSales / 1000).toFixed(1)} тыс. ₽`} 
                    change="+12%"
                    theme={theme}
                  />
                  <StatItem 
                    label="Средний чек" 
                    value={`${avgPrice} ₽`} 
                    change="+5%"
                    theme={theme}
                  />
                  <StatItem 
                    label="Популярный цветок" 
                    value={popularFlower.name} 
                    secondary={`${popularFlower.sales} шт`}
                    theme={theme}
                  />
                </Stack>
              </CardContent>
            </StyledCard>
            
            <StyledCard>
              <CardContent sx={{ p: 2 }}>
                <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
                  Категории
                </Typography>
                <Box sx={{ height: 200 }}>
                  <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                      <Pie
                        data={categoryData}
                        cx="50%"
                        cy="50%"
                        outerRadius={70}
                        dataKey="value"
                        nameKey="name"
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                      >
                        {categoryData.map((entry, index) => (
                          <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                      </Pie>
                      <Tooltip />
                    </PieChart>
                  </ResponsiveContainer>
                </Box>
              </CardContent>
            </StyledCard>
          </Box>
        </Box>
      )}

      {tabValue === 1 && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Топ продаж
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[...flowerSalesData].sort((a, b) => b.sales - a.sales)}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="name" />
                    <YAxis />
                    <Tooltip />
                    <Bar 
                      dataKey="sales" 
                      name="Продажи (шт)" 
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
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Цены и спрос
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <ComposedChart data={flowerSalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="name" />
                    <YAxis yAxisId="left" orientation="left" />
                    <YAxis yAxisId="right" orientation="right" />
                    <Tooltip />
                    <Bar 
                      yAxisId="left" 
                      dataKey="sales" 
                      name="Продажи (шт)" 
                      fill={theme.palette.primary.main} 
                    />
                    <Line 
                      yAxisId="right" 
                      type="monotone" 
                      dataKey="price" 
                      name="Цена (₽)" 
                      stroke="#ff6b6b" 
                    />
                  </ComposedChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StyledCard>
        </Box>
      )}

      {tabValue === 2 && (
        <Box sx={{ display: 'grid', gridTemplateColumns: { xs: '1fr', md: '1fr 1fr' }, gap: 2 }}>
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Сезонность
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={monthlySalesData}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="month" />
                    <YAxis />
                    <Tooltip />
                    <Line 
                      type="monotone" 
                      dataKey="sales" 
                      name="Продажи (₽)" 
                      stroke="#8884d8" 
                      strokeWidth={2}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </Box>
            </CardContent>
          </StyledCard>
          
          <StyledCard>
            <CardContent sx={{ p: 2 }}>
              <Typography variant="h6" gutterBottom sx={{ fontWeight: 600, fontSize: '1rem' }}>
                Сезонный рейтинг
              </Typography>
              <Box sx={{ height: 300 }}>
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={[...flowerSalesData].sort((a, b) => b.season - a.season)}>
                    <CartesianGrid strokeDasharray="3 3" stroke={theme.palette.divider} />
                    <XAxis dataKey="name" />
                    <YAxis domain={[0, 5]} />
                    <Tooltip />
                    <Bar 
                      dataKey="season" 
                      name="Сезонность (1-5)" 
                      fill="#4BC0C0" 
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

const StatItem = ({ label, value, change, secondary, theme }) => (
  <Box sx={{ 
    p: 1,
    backgroundColor: alpha(theme.palette.primary.main, 0.05),
    borderRadius: '8px',
    borderLeft: `4px solid ${theme.palette.primary.main}`
  }}>
    <Typography variant="subtitle2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>{label}</Typography>
    <Typography variant="h6" sx={{ fontWeight: 600, fontSize: '1rem' }}>{value}</Typography>
    {secondary && (
      <Typography variant="body2" color="text.secondary" sx={{ fontSize: '0.75rem' }}>{secondary}</Typography>
    )}
    {change && (
      <Typography 
        variant="body2" 
        sx={{ 
          color: change.startsWith('+') ? theme.palette.success.main : theme.palette.error.main,
          fontWeight: 500,
          fontSize: '0.75rem'
        }}
      >
        {change} за период
      </Typography>
    )}
  </Box>
);

export default AdminStat;