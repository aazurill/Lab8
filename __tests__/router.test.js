/**
 * @jest-environment jsdom
 */
import { TestScheduler } from '@jest/core';
import { pushToHistory } from '../scripts/router.js';

describe('pushToHistory Test', () => {
  // Test setting
  test('push setting state test', () => {
    const settingPush = pushToHistory('settings', 0)
    // Check current state obj correct
    expect(settingPush.state.page).toBe('settings');
    // Check length correct
    expect(settingPush.length).toBe(2);
  });
  // Test entry
  test('push entry test', () => {
    const entryPush = pushToHistory('entry', 0);
    // Check current state obj correct
    expect(entryPush.state.page).toBe('entry0');
    // Check length correct
    expect(entryPush.length).toBe(3);
  });
  // Test default
  test('push default test', () => {
    const defaultPush = pushToHistory('test', 0);
    // Check current state obj correct
    expect(defaultPush.state.page).toBe(undefined);
    // Check length correct
    expect(defaultPush.length).toBe(4);
  });
})
