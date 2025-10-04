import {test, expect, request} from '@playwright/test';

//Verify POST and GET endpoints
test('API CRUD: Create and retrieve escape attempt', async({request}) => {
    //POST
    const newAttempt = {
        player: 'Test Player',
        timeTaken: 123,
        success: true,
    };

    const postResponse = await request.post('http://localhost:3000/api/attempts', {
        data: newAttempt,
    });

    expect(postResponse.ok()).toBeTruthy();
    const created = await postResponse.json();
    expect(created.player).toBe(newAttempt.player);
    expect(created.success).toBe(true);

    //GET
    const getResponse = await request.get('http://localhost:3000/api/attempts');
    expect(getResponse.ok()).toBeTruthy();

    const allAttempts = await getResponse.json();
    const found = allAttempts.find((a: any) => a.id === created.id);

    expect(found).toBeTruthy();
    expect(found.player).toBe('Test Player');
    expect(found.timeTaken).toBe(123);
    expect(found.success).toBe(true);
});