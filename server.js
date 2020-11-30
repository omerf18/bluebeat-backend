const express = require('express')
const bodyParser = require('body-parser')
const cors = require('cors')
const path = require('path')
const cookieParser = require('cookie-parser')
const session = require('express-session')

const app = express()
const http = require('http').createServer(app);
const io = require('socket.io')(http);

// Express App Config
app.use(cookieParser())
app.use(bodyParser.json());
app.use(session({
    secret: 'bluebeat CaSep20',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false }
}))

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.resolve(__dirname, 'public')));
} else {
    const corsOptions = {
        origin: ['http://127.0.0.1:8084', 'http://localhost:8084', 'http://127.0.0.1:3000', 'http://localhost:3000'],
        // origin: ['http://127.0.0.1:8082', 'http://localhost:8082', 'http://127.0.0.1:3030', 'http://localhost:3030'],
        credentials: true
    };
    app.use(cors(corsOptions));
}


const authRoutes = require('./api/auth/auth.routes')
const beatRoutes = require('./api/beat/beat.routes')
// const userRoutes = require('./api/user/user.routes')
const connectSockets = require('./api/socket/socket.routes')


// routes
app.use('/api/auth', authRoutes)
app.use('/api/beat', beatRoutes)
// app.use('/api/user', userRoutes)
connectSockets(io)

app.get('/**', (req, res) => {
    res.sendFile(path.join(__dirname, 'public', 'index.html'));
})

const logger = require('./services/logger.service')
const port = process.env.PORT || 3030;
http.listen(port, () => {
    logger.info('Server is running on port: ' + port)
});

