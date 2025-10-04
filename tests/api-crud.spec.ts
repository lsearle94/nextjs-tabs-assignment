import {test, expect, request} from '@playwright/test';

test.beforeEach(async ({}, testInfo) => {
    console.log(`\n Running test: ${testInfo.title}`);
});

//Verify POST and GET endpoints
test('API CRUD: Create and retrieve escape attempt', async({request}) => {
    console.log('[LOG] Starting Create + Restrieve test');
    //POST
    const newAttempt = {
        player: 'Test Player',
        timeTaken: 123,
        success: true,
    };

    const postResponse = await request.post('http://localhost:3000/api/attempts', {
        data: newAttempt,
    });
    console.log('[LOG] POST response status:', postResponse.status());

    expect(postResponse.ok()).toBeTruthy();
    const created = await postResponse.json();
    console.log('[LOG] Created attempt:', created);
    expect(created.player).toBe(newAttempt.player);
    expect(created.success).toBe(true);

    //GET
    const getResponse = await request.get('http://localhost:3000/api/attempts');
    console.log('[LOG] GET response status:', getResponse.status());
    expect(getResponse.ok()).toBeTruthy();

    const allAttempts = await getResponse.json();
    const found = allAttempts.find((a: any) => a.id === created.id);

    console.log('[LOG] Found attempt:', found);
    expect(found).toBeTruthy();
    expect(found.player).toBe('Test Player');
    expect(found.timeTaken).toBe(123);
    expect(found.success).toBe(true);

    console.log('[Test Passed]');
});