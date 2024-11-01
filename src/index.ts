import avvio from 'avvio';
import { whatsappService } from './Applications/whatsapp-bot.js';
import { restService } from './Applications/rest.js';

const app = avvio();

app.use(whatsappService);
app.use(restService);

app.ready((err) => {
	if (err) {
		throw err;
	}

	console.log('Running app');
});
