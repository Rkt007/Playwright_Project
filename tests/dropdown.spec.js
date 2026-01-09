import { test, expect } from '@playwright/test';

test('Country dropdown - full validation script', async ({ page }) => {

  // Set timeout
  page.setDefaultTimeout(5000);

  // Navigate to application
  await page.goto('https://practice.expandtesting.com/dropdown');

  // Dropdown locator
  const countryDropdown = page.locator('#country');

  // All dropdown options
  const allOptions = page.locator('#country option');

  // 1️⃣ Get total number of options
  const optionCount = await allOptions.count();
  console.log('Total options in country dropdown:', optionCount);

  // 2️⃣ Get all option texts
  const optionTexts = await allOptions.allTextContents();
  console.log('Dropdown option texts:', optionTexts); 

  // verify india present in option dropdown texts
    expect(optionTexts).toContain('India');

  // 3️⃣ Get all option values
  const optionValues = [];
  for (let i = 0; i < optionCount; i++) {
    const value = await allOptions.nth(i).getAttribute('value');
    optionValues.push(value);
  }
  console.log('Dropdown option values:', optionValues);

  // 4️⃣ Validate expected option present
  expect(optionTexts).toContain('India');

  // 5️⃣ Select option by label
  await countryDropdown.selectOption({ label: 'India' });

  // 6️⃣ Validate selected value
  const selectedValue = await countryDropdown.inputValue();
  expect(selectedValue).toBe('IN');

  // 7️⃣ Select option by value
  await countryDropdown.selectOption({ value: 'AE' });
  await expect(countryDropdown).toHaveValue('AE');

  // 8️⃣ Select option by index
  await countryDropdown.selectOption({ index: 3 });
  const finalValue = await countryDropdown.inputValue();
  expect(finalValue).not.toBe('');

});
