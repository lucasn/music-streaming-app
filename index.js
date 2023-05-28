import { app, PORT } from './src/configs/server.js'
import { configureRoutes } from './src/routes/user_routes.js';

configureRoutes();

app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));