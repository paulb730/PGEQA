import { test, expect } from '@playwright/test';
const path = require('path');

const USERNAME = process.env.TEST_USERNAME || 'david.salgado.test';
const PASSWORD = process.env.TEST_PASSWORD || 'Password_01*';



// Get GCD number from file
  const fs = require('fs');
  const gcdNumber = fs.readFileSync('datatachments/gcd-number.txt', 'utf8').trim();

test('TareaRevisar', async ({ browser }) => {

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




 // revisar y buscar la tarea 
  await page.getByTestId('button-menu-item-Bandeja').click();
  await page.waitForTimeout(1000);
  await page.getByTestId('button-menu-item-Tareas Pendientes').click();
  await page.getByTestId('input-search-workitems').click();
  await page.getByTestId('input-search-workitems').fill(GCD);
  await page.getByRole('button', { name: '' }).click();
  await page.getByTestId('list-item-workitem-60260').locator('div').filter({ hasText: /^Revisar Documento$/ }).click();


 // Verificar que la tarea existe
  await expect(page.getByRole('cell', { name: gcdNumber })).toBeVisible();


 

  
  //await page.getByTestId('list-item-workitem-60259').getByText('GCD-'+GCD).click();






});