import { test, expect } from '@playwright/test';

test.describe('Work Instruction Assignment - Form Tests', () => {
  test.beforeEach(async ({ page }) => {
    // Login to Workerbase
    await page.goto('https://review-4166.review.workerbase.dev/login');
    await page.fill('input[name="email"]', 'goharali627@gmail.com');
    await page.type('input[name="password"]', 'Workerbase1!', { delay: 100 });
    await page.click('button[type="submit"]');

    // Wait for login redirect, then go to rules page
    await page.waitForURL('https://review-4166.review.workerbase.dev/find');
    await page.goto('https://review-4166.review.workerbase.dev/projects/68363d2113c42323cc7a6a36/rules');
  });

  test('WI-01: Create and validate new rule with WI assignment', async ({ page }) => {
    const ruleName = 'QA Engineer Challenge Rule: Test Automation';

    // Click Create Rule and fill trigger
    await page.click('button:has-text("Create Rule")');
    await page.click('text=Triggered when this function is called.');
    await page.fill('input[name="name"]', ruleName);

    // Click through to Assignment step
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Continue")');
    await page.click('text=Workinstructions');

    // Select Workinstruction template
    await page.locator('div.Field-module__fieldContainer___eRlRg:has-text("Workinstruction")')
      .locator('div.baseSelect__control').click();
    await page.waitForSelector('text="Empty Work Instruction"');
    await page.click('text="Empty Work Instruction"');

    // Fill Headline and Title
    await page.fill('input[name="task-headline"]', 'Test Headline from Automation');
    await page.fill('input[name="task-title"]', 'Test Title from Automation');

    // Select Role as recipient
    await page.locator('div.Field-module__fieldContainer___eRlRg:has-text("Recipient")')
      .locator('div.baseSelect__control').click();
    await page.click('text="QA Engineer Candidate"');

    // Click Save
    await page.click('button:has-text("Save")');

    // Validate confirmation popup and redirect
    await expect(page.locator('text="Rule created"')).toBeVisible();
    await page.waitForURL('https://review-4166.review.workerbase.dev/projects/68363d2113c42323cc7a6a36/rules');

    // Validate rule name appears in list
    await expect(page.locator(`text="${ruleName}"`)).toBeVisible();
    console.log(`✅ Rule "${ruleName}" successfully created and verified.`);
    await page.waitForTimeout(5000);
  });

  test('WI-Validation: Both Headline and Title are required', async ({ page }) => {
    await page.click('button:has-text("Create Rule")');
    await page.click('text=Triggered when this function is called.');
    await page.fill('input[name="name"]', 'Validation Test - Missing Headline and Title');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Continue")');
    await page.click('text=Workinstructions');

    // Select Workinstruction template
    await page.locator('div.Field-module__fieldContainer___eRlRg:has-text("Workinstruction")')
      .locator('div.baseSelect__control').click();
    await page.waitForSelector('text="Empty Work Instruction"');
    await page.click('text="Empty Work Instruction"');

    // Fill only Role, leave Headline and Title empty
    await page.locator('div.Field-module__fieldContainer___eRlRg:has-text("Recipient")')
      .locator('div.baseSelect__control').click();
    await page.click('text="QA Engineer Candidate"');

    await page.click('button:has-text("Save")');

    // Validate both required error messages
    await expect(page.locator('text="Required"')).toHaveCount(2);
    console.log("✅ Both Headline and Title required validations displayed correctly.");
  });

  test('WI-04: Role is required', async ({ page }) => {
    await page.click('button:has-text("Create Rule")');
    await page.click('text=Triggered when this function is called.');
    await page.fill('input[name="name"]', 'Missing Role Test');
    await page.click('button:has-text("Continue")');
    await page.click('button:has-text("Continue")');
    await page.click('text=Workinstructions');

    // Select Workinstruction template
    await page.locator('div.Field-module__fieldContainer___eRlRg:has-text("Workinstruction")')
      .locator('div.baseSelect__control').click();
    await page.waitForSelector('text="Empty Work Instruction"');
    await page.click('text="Empty Work Instruction"');

    // Fill Headline and Title but skip Role
    await page.fill('input[name="task-headline"]', 'Valid Headline');
    await page.fill('input[name="task-title"]', 'Valid Title');
    await page.click('button:has-text("Save")');

    // Validate required error for role
    await expect(page.locator('text="Required"')).toBeVisible();
    console.log("✅ Role required validation displayed correctly.");
  });
});


