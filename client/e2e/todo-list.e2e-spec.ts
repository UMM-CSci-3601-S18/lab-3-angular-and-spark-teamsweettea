import {TodoPage} from './todo-list.po';
import {browser, protractor} from 'protractor';

let origFn = browser.driver.controlFlow().execute;

//https://hassantariqblog.wordpress.com/2015/11/09/reduce-speed-of-angular-e2e-protractor-tests/
browser.driver.controlFlow().execute = function () {
  let args = arguments;

  // queue 100ms wait between test
  //This delay is only put here so that you can watch the browser do its' thing.
  //If you're tired of it taking long you can remove this call
  origFn.call(browser.driver.controlFlow(), function () {
    return protractor.promise.delayed(100);
  });

  return origFn.apply(browser.driver.controlFlow(), args);
};

describe('Todo list', () => {
  let page: TodoPage;

  beforeEach(() => {
    page = new TodoPage();
  });

  it('should get and highlight Todo Owner attribute ', () => {
    page.navigateTo();
    expect(page.getTodoTitle()).toEqual('Todos');
  });

  // Owner Filtering
  it('should type a letter and get a specific id', () => {
    page.navigateTo();
    page.typeAnOwner("w");
    expect(page.getUniqueTodo("588959851d787486cef967d2")).toEqual("Workman");
  });

  it('should type an owner and get a specific id', () => {
    page.navigateTo();
    page.typeAnOwner("fry");
    expect(page.getUniqueTodo("58895985ae3b752b124e7663")).toEqual("Fry");
  });

  // Filter by ID
  it('should type an id and get one result', () => {
    page.navigateTo();
    page.typeAnId("58895985e30e58eeca18cf6a");
    expect(page.getUniqueTodo("58895985e30e58eeca18cf6a")).toEqual("Roberta");
  });

  // Filter by status
  it('should type a status and get a specific id', () => {
    page.navigateTo();
    page.typeAStatus("complete");
    expect(page.getUniqueTodo("58895985e9aaeaad6292df39")).toEqual("Dawn");
  });

  it('should type a status and get a specific id', () => {
    page.navigateTo();
    page.typeAStatus("incomplete");
    expect(page.getUniqueTodo("58895985c32328e015584db2")).toEqual("Workman");
  });

  //Filter by Body
  it('should type a word and get a specific id', () => {
    page.navigateTo();
    page.typeABody("Ullamco");
    expect(page.getUniqueTodo("58895985ae3b752b124e7663")).toEqual("Fry");
  });

  it('should type a letter and get a specific id', () => {
    page.navigateTo();
    page.typeABody("q");
    expect(page.getUniqueTodo("58895985a22c04e761776d54")).toEqual("Blanche");
  });

  it('should type an entire body and get a specific id', () => {
    page.navigateTo();
    page.typeABody("Eiusmod commodo officia amet aliquip est ipsum nostrud duis sunt voluptate mollit excepteur. Sunt non in pariatur et culpa est sunt.");
    expect(page.getUniqueTodo("5889598528c4748a0292e014")).toEqual("Workman");
  });

  //Filter by Category
  it('should type a category and get a specific id', () => {
    page.navigateTo();
    page.typeACategory("software design");
    expect(page.getUniqueTodo("58895985cc9e12baff820394")).toEqual("Fry");
    });

  it('should type a category and get a specific id', () => {
    page.navigateTo();
    page.typeACategory("homework");
    expect(page.getUniqueTodo("58895985a2d8df3f76cb85a0")).toEqual("Roberta");
  });
});
