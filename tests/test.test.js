import { test, expect } from '@playwright/test';
const path = require('path');


const USERNAME = process.env.TEST_USERNAME || 'christian.molina.test';
const PASSWORD = process.env.TEST_PASSWORD || 'Password_01*';
const ASUNTO = process.env.TEST_ASUNTO || 'auto task QA007 PB';
const PRIMER_REVISOR = process.env.TEST_PRIMER_REVISOR || 'david test';
const APROBADOR = process.env.TEST_APROBADOR || 'chris';
const DESTINATARIO = process.env.TEST_DESTINATARIO || 'dc';

test('Crear Memo', async ({ browser }) => {
  // Crear un contexto con el idioma en español
  const context = await browser.newContext({ locale: 'es-ES' });
  const page = await context.newPage();

  // abre la URL
  await page.goto('https://flujotest.pge.gob.ec');

  //credenciales del usuario 
  //pagina login
  await page.getByRole('textbox', { name: 'Nombre de Usuario' }).fill(USERNAME);
  await page.getByRole('textbox', { name: 'Contraseña' }).click();
  await page.getByRole('textbox', { name: 'Contraseña' }).fill(PASSWORD);
  await page.getByRole('button', { name: 'Conectar' }).click();


  await page.getByTestId('button-menu-item-Gestión y Control').click();
  await page.getByTestId('button-menu-item-Elaboración de documento').click();
  await page.getByTestId('input-select-type-document').locator('span').click();
  await page.getByText('Memorándum').click();
  await page.getByTestId('input-text-asunto').click();
  await page.getByTestId('input-text-asunto').fill(ASUNTO);
  await page.getByRole('radio', { name: '¿Requiere revisores?: Si No' }).check();


  await page.locator('.css-19bb58m').first().click();
  await page.getByRole('combobox', { name: 'Primer Revisor*: Use Up and' }).fill('david test');
  await page.getByRole('option', { name: 'Ing. David Test Salgado - Cargo: Director Nacional De Tecnologías De La Información - Grupo: Dirección Nacional De Tecnologías De La Información', exact: true }).click();
  
  await page.locator('.css-tlw1pm-control > .css-hlgwow > .css-19bb58m').first().click();
  await page.getByRole('combobox', { name: 'Aprobador/ Firmante*: Use Up' }).fill('chris');
  await page.getByRole('option', { name: 'Ing. Christian Test Molina -' }).click();


  await page.locator('#input-select-async-destinatario > .css-tlw1pm-control > .css-hlgwow > .css-19bb58m').click();
  await page.getByRole('combobox', { name: 'Destinatario(s)*: Use Up and' }).fill('dc');
  await page.getByRole('option', { name: 'Ing. David Constante - Cargo' }).click();

  await page.getByTestId('btn-add-cc').click();

  await page.locator('#input-select-async-cc > .css-tlw1pm-control > .css-hlgwow > .css-19bb58m').click();

  await page.getByRole('combobox', { name: 'CC: Use Up and Down to choose' }).fill('rodri');
  await page.getByRole('option', { name: 'Sr. Rodrigo Test Constantine' }).click();

 

  await page.getByTestId('text-area-instructions').click();
  await page.getByTestId('text-area-instructions').fill('instrucciones QA memo');


  //archivo de suscripcion

  await page.getByRole('radio', { name: 'Contiene Archivo para' }).check();
  await page.getByTestId('btn-select-process').click();

  const filePath = path.resolve(__dirname, '../datatachments/adjunto1.pdf');

  const fileChooserPromise = page.waitForEvent('filechooser');

  await page.getByTestId('dialog').getByTestId('btn-add-attachment').click();

  const fileChooser = await fileChooserPromise;

  await fileChooser.setFiles(filePath);

  await page.getByTestId('btn-ok').click();

  //proceso ingreso 
  //await page.getByRole('radio', { name: 'Enlazada a Proceso/Ingreso:' }).check();

  //await page.getByRole('article').locator('div').filter({ hasText: 'Prioridad:MediaMedia Enlazada' }).getByTestId('btn-select-process').click();
  //await page.getByTestId('input-text-entry-number').click();
  //await page.getByTestId('input-text-entry-number').fill('276008-2025-JM-JL');
  //await page.getByTestId('btn-search-process').click();

 await page.waitForTimeout(10000);

 //await page.getByRole('cell').filter({ hasText: /^$/ }).nth(1).click();

  //await page.getByTestId('table-select-documents').getByRole('cell', { name: 'a7650570.pdf' }).click();
  
  //await page.getByTestId('table-select-documents').getByRole('row', { name: '1 a7629767.pdf' }).locator('input[type="checkbox"]').check();
  //await page.getByTestId('table-select-documents').getByRole('row', { name: '2 a7629773.pdf' }).locator('input[type="checkbox"]').check();
  //await page.getByTestId('btn-select-process-accept').click();



  //respuesta alcance SI NO
  //await page.getByRole('radio', { name: 'Respuesta/Alcance: Si No' }).check();
  //await page.getByRole('article').locator('div').filter({ hasText: 'Respuesta/Alcance: Respuesta/' }).getByTestId('btn-select-process').click();
  //await page.getByRole('row', { name: '1 PGE-DNTI-2025-00302-M' }).getByRole('cell').first().click();
  //await page.getByTestId('btn-select-numbering-accept').click();



   await page.locator('.flex.justify-between.items-center.mb-4').click();
  //adjuntar 

   const filePath2 = path.resolve(__dirname, '../datatachments/adjunto2.pdf');

   const fileChooserPromise2 = page.waitForEvent('filechooser');


  
  await page.getByRole('button', { name: '' }).click();

  const fileChooser2 = await fileChooserPromise2;

  await fileChooser2.setFiles(filePath2);

  //await page.getByTestId('dialog').getByTestId('btn-add-attachment').setInputFiles(filePath);
  await page.getByTestId('btn-process-document').click();
  await page.getByRole('heading', { name: 'El documento ha sido creado' });
  await expect(page.getByRole('heading', { name: 'El documento ha sido creado' })).toHaveText('El documento ha sido creado con éxito');
  const docNumber = await page.getByText('GCD-').textContent();

  // Write the GCD number to a file for the next test to use
  const fs = require('fs');
  fs.writeFileSync('datatachments/gcd-number.txt', docNumber);
  console.log('Número de documento:', docNumber);
  await page.waitForTimeout(2000);
  await page.getByTestId('btn-modal-created-accept').click();

  
  // Set the environment variable
  process.env.GCDNUMBER = docNumber;
  test.info().annotations.push({
    type: 'gcd',
    description: docNumber
  });



  });

  

