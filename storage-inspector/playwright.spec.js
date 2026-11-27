import { test, expect } from '@playwright/test';

const prefix = '__storage_inspector_e2e_';

test.beforeEach(async ({ page }) => {
  await page.goto('/storage-inspector/index.html');
  await page.evaluate((p) => {
    for (const key of Object.keys(localStorage)) if (key.startsWith(p)) localStorage.removeItem(key);
    for (const key of Object.keys(sessionStorage)) if (key.startsWith(p)) sessionStorage.removeItem(key);
  }, prefix);
});

test.afterEach(async ({ page }) => {
  await page.evaluate((p) => {
    for (const key of Object.keys(localStorage)) if (key.startsWith(p)) localStorage.removeItem(key);
    for (const key of Object.keys(sessionStorage)) if (key.startsWith(p)) sessionStorage.removeItem(key);
  }, prefix);
});

test('adds, searches, edits and deletes a localStorage entry', async ({ page }) => {
  const key = prefix + 'crud';
  await page.locator('#key').fill(key);
  await page.locator('#value').fill('alpha value');
  await page.locator('#editor').evaluate((form) => form.requestSubmit());
  await expect(page.locator('.entry')).toHaveCount(1);
  await expect(page.locator('#count')).toHaveText('1');

  await page.locator('#search').fill('alpha');
  await expect(page.locator('.entry')).toHaveCount(1);
  await page.locator('#search').fill('not found');
  await expect(page.getByText('No matching entries')).toBeVisible();
  await page.locator('#search').fill('');

  await page.getByRole('button', { name: 'Edit ' + key }).click();
  await page.locator('#value').fill('beta value');
  await page.locator('#editor').evaluate((form) => form.requestSubmit());
  await expect(page.locator('.preview')).toHaveText('beta value');
  await expect(page.evaluate((k) => localStorage.getItem(k), key)).resolves.toBe('beta value');

  await page.getByRole('button', { name: 'Delete ' + key }).click();
  await expect(page.locator('.entry')).toHaveCount(0);
  await expect(page.evaluate((k) => localStorage.getItem(k), key)).resolves.toBeNull();
});

test('switches between localStorage and sessionStorage independently', async ({ page }) => {
  const key = prefix + 'session';
  await page.locator('#sessionTab').click();
  await page.locator('#key').fill(key);
  await page.locator('#value').fill('session only');
  await page.locator('#editor').evaluate((form) => form.requestSubmit());
  await expect(page.evaluate((k) => sessionStorage.getItem(k), key)).resolves.toBe('session only');
  await page.locator('#localTab').click();
  await expect(page.locator('.entry')).toHaveCount(0);
  await page.locator('#sessionTab').click();
  await expect(page.locator('.entry')).toHaveCount(1);
});

test('imports JSON object, rejects invalid shape and exports JSON download', async ({ page }) => {
  const input = page.locator('#file');
  await input.setInputFiles({
    name: 'fixture.json',
    mimeType: 'application/json',
    buffer: Buffer.from(JSON.stringify({ [prefix + 'imported']: { enabled: true }, [prefix + 'text']: 'hello' })),
  });
  await expect(page.locator('#ioStatus')).toContainText('Imported 2 entries');
  await expect(page.evaluate((k) => localStorage.getItem(k), prefix + 'imported')).resolves.toBe('{"enabled":true}');

  await input.setInputFiles({ name: 'invalid.json', mimeType: 'application/json', buffer: Buffer.from('[]') });
  await expect(page.locator('#ioStatus')).toContainText('JSON must be an object');
  await expect(page.evaluate((k) => localStorage.getItem(k), prefix + 'imported')).resolves.toBe('{"enabled":true}');

  const downloadPromise = page.waitForEvent('download');
  await page.locator('#exportBtn').click();
  const download = await downloadPromise;
  expect(download.suggestedFilename()).toMatch(/localstorage-.*\.json|local-storage-.*\.json/i);
  const path = await download.path();
  expect(path).toBeTruthy();
});

test('clear confirmation can be canceled, dismissed with Escape, and confirmed', async ({ page }) => {
  const key = prefix + 'clear';
  await page.evaluate(([k]) => localStorage.setItem(k, 'keep until confirmed'), [key]);
  await page.reload();
  await page.locator('#clearBtn').click();
  await page.locator('#cancelClear').click();
  await expect(page.evaluate((k) => localStorage.getItem(k), key)).resolves.toBe('keep until confirmed');

  await page.locator('#clearBtn').click();
  await page.keyboard.press('Escape');
  await expect(page.locator('#confirmModal')).not.toHaveAttribute('open');

  await page.locator('#clearBtn').click();
  await page.locator('#confirmClear').click();
  await expect(page.evaluate((k) => localStorage.getItem(k), key)).resolves.toBeNull();
});

test('keyboard and labels keep primary controls accessible', async ({ page }) => {
  await expect(page.getByRole('searchbox', { name: 'Search keys and values' })).toBeVisible();
  await expect(page.locator('#key')).toBeVisible();
  await expect(page.getByLabel('VALUE · plain text or JSON')).toBeVisible();
  await page.locator('#clearBtn').focus();
  await page.keyboard.press('Enter');
  await expect(page.locator('#confirmModal')).toHaveAttribute('open');
  await page.keyboard.press('Escape');
  await expect(page.locator('#confirmModal')).not.toHaveAttribute('open');
});
