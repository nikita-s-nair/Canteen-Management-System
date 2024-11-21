const express = require('express');
const cors = require('cors');
const sequelize = require('./config/db');
const authRoutes = require('./routes/authRoutes');
const menuRoutes = require('./routes/menuRoutes');
const orderRoutes = require('./routes/orderRoutes');
const paymentRoutes = require('./routes/paymentRoutes');
const canteenRoutes = require('./routes/canteenRoutes');
const userRoutes = require('./routes/user');
const signInRoutes = require('./routes/signInRoute');

const app = express();
app.use(cors());
app.use(express.json());

app.use((err,req,res,next)=>{
    console.log(req.path,req.method)
})

app.use('/api/signin', signInRoutes);
app.use('/api/signup', userRoutes);
app.use('/api/auth', authRoutes);
app.use('/api/menu/', menuRoutes);
app.use('/api/create-order', orderRoutes);
app.use('/api/make-payment', paymentRoutes);
app.use('/api/canteens', canteenRoutes);


const PORT = process.env.PORT || 5000;

sequelize.sync().then(() => {
    app.listen(PORT, () => {
        console.log(`Server running on port ${PORT}`);
    });
}).catch((error) => {
    console.error('Unable to connect to the database:', error);
});
