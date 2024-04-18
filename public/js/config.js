// config.js fonctionnel en attendant la variabilisation par KS
// ce fichier n'est plus ignoré par git
// a remettre dans le gitignore quand la variabilisation sera operationnelle
window.MAINTENANCE = 'false';
window.MAINTENANCE_TITLE = '';
window.MAINTENANCE_MESSAGE = '';

// base url pour tous les acces api effectues par Axios
// TODO il faut modifier la variable ci-dessous pour l'adapter a celle de votre back-end
window.API_URL = '/xxxxj/rest';

// Variabilisation PDO / KS
window.externalValue = '{{ EXTERNAL_VALUE }}';
