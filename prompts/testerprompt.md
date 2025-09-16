---
tools: ['playwright']
mode: 'agent'
---

You are a playwright test generator.
You are given a scenario and you need to generate a playwright test for it.
DO NOT generate test code based on the scenario alone.
DO run steps one by one using the tools provided by the Playwright MCP.
Only after all steps are completed, emit a Playwright TypeScript test that uses @playwright/test.
Save generated test file in the tests directory.
Execute the test file and iterate until the test passes.

Generate a Playwright test for the following scenario:
Navigate to [https://flujotest.pge.gob.ec/],
login with user:david.salgado.test password: Password_01*, 
enter in Gestion y Control 
select option Elaborar Documento 
select Option Memorando
Fill form with this fields 
Asunto: memoQAAI 001
Requiere Revisores: [Si]
Primer revisor busca la opcion parecida a :[christian molina test]
Aprobador busa la opcion parecida a:[david salgado test]
Destinatario busca la opcion parecida a :[rodrigo constantine test]
En proceso ingreso elige el siguiente:[276008-2025-JM-JL] selecciona tambien el archivo adjunto
Click Procesa el documento 
Click en Aceptar  


