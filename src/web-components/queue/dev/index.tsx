import { WebQueueComponentBase } from '../base';

class WebQueueComponent extends WebQueueComponentBase {}

// Для локального тестирования используем другое имя
customElements.define('web-queue-dev', WebQueueComponent); 