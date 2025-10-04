import { test, expect } from '@playwright/test';

//Test 1: Home page loading and timer input availability
test('Home page should load and display timer', async ({page}) => {
    await page.goto('http://localhost:3000/escape-room');
    await expect(page.getByPlaceholder('Enter minutes')).toBeVisible();
});

//Test 2: Stage 1 works when fixing the broken code
test('Stage 1: Fix the code challenge', async ({page}) => {
    await page.goto('http://localhost:3000/escape-room');

    //Set timer
    const timerInput = page.getByPlaceholder('Enter minutes');
    await timerInput.fill('1');
    await page.getByRole('button', {name: 'Start Timer' }).click();

    //Click the "Let's Escape" button
    await page.getByRole('button', {name:'Lets Escape!'}).click({force: true});
    if (await page.getByText(/Please start the timer/i).isVisible()){
        await page.getByRole('button', {name: 'Close'}).click();
        await page.getByRole('button', {name: 'Lets Escape!'}).click();
    }
    await page.waitForTimeout(1000);
    await expect(page.getByText(/Stage 1/i)).toBeVisible({ timeout: 10000 });   //Wait for stage 1 to be visible

    await page.waitForTimeout(1500);
    
    //Replace corrupted code with correct code
    const codeBox = await page.waitForSelector('[data-testid="stage1-editor"]', {
        state: 'visible',
        timeout: 15000,
    });
    await codeBox.fill('console.log("FindtheKey!");');

    //Submit the answer
    await page.getByRole('button', {name:'Submit Answer' }).click();

    //Feedback: "Correct!"
    await expect(page.getByText('Correct!')).toBeVisible({timeout: 5000});

    //Proceed to next stage
    await page.getByRole('button',{name: 'Proceed to next level'}).click();

    //Confirm stage 2 is shown
    await expect(page.getByText('Unlock the door')).toBeVisible();
});