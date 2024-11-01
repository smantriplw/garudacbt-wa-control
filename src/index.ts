import avvio from 'avvio';
import { whatsappService } from './Applications/whatsapp-bot.js';

const app = avvio();
app.use(whatsappService);

app.ready((err) => {
	if (err) {
		throw err;
	}

	console.log('Running app');
});
