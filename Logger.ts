import type { Method } from "./types";

/**
 * Класс, осуществляющий логгирование.
 */
export class Logger {
  /**
   * Флаг, указывающий, добавлять ли дату к логам.
   * @type {boolean}
   */
  isDate: boolean = true;

  /**
   * Создает новый экземпляр Logger.
   * @param {boolean} [isDate=true] - Флаг, указывающий, добавлять ли дату к логам. По умолчанию true.
   */
  constructor(isDate: boolean = true) {
    this.isDate = isDate;
  }

  /**
   * Выводит сообщение с уровнем логирования "log".
   * @param {unknown} message - Сообщение для логирования.
   * @param {boolean} [isDate=this.isDate] - Флаг, указывающий, добавлять ли дату к логам. По умолчанию равен значению свойства isDate.
   * @returns {Logger} - Текущий экземпляр Logger.
   */
  log(message: unknown, isDate = this.isDate) {
    return this.#handler("log", message, isDate);
  }

  /**
   * Выводит сообщение с уровнем логирования "warn".
   * @param {unknown} message - Сообщение для логирования.
   * @param {boolean} [isDate=this.isDate] - Флаг, указывающий, добавлять ли дату к логам. По умолчанию равен значению свойства isDate.
   * @returns {Logger} - Текущий экземпляр Logger.
   */
  warn(message: unknown, isDate = this.isDate) {
    return this.#handler("warn", message, isDate);
  }

  /**
   * Выводит сообщение с уровнем логирования "error".
   * @param {unknown} message - Сообщение для логирования.
   * @param {boolean} [isDate=this.isDate] - Флаг, указывающий, добавлять ли дату к логам. По умолчанию равен значению свойства isDate.
   * @returns {Logger} - Текущий экземпляр Logger.
   */
  error(message: unknown, isDate = this.isDate) {
    return this.#handler("error", message, isDate);
  }

  /**
   * Начинает новую группу логов.
   * @param {unknown} name - Имя группы.
   * @returns {Logger} - Текущий экземпляр Logger.
   */
  group(name: unknown) {
    return this.#handler("group", name);
  }

  /**
   * Завершает текущую группу логов.
   * @returns {Logger} - Текущий экземпляр Logger.
   */
  groupEnd() {
    return this.#handler("groupEnd");
  }

  /**
   * Обработчик логирования.
   * @param {Method} method - Метод логирования.
   * @param {unknown} [message] - Сообщение для логирования.
   * @param {boolean} [isDate] - Флаг, указывающий, добавлять ли дату к логам.
   * @private
   */
  #handler(method: Method, message?: unknown, isDate?: boolean) {
    const callArgs = [message];
    if (isDate) callArgs.push(this.#createDate());
    this.#call(method, callArgs);

    return this;
  }

  /**
   * Создает строку с текущей датой и временем.
   * @returns {string} - Строка с текущей датой и временем.
   * @private
   */
  #createDate() {
    const date = new Date();

    const timezoneOffset = date.getTimezoneOffset();
    const offset = Math.abs(timezoneOffset);
    const offsetOperator = timezoneOffset < 0 ? "+" : "-";
    const offsetHours = Math.floor(offset / 60)
      .toString()
      .padStart(2, "0");
    const offsetMinutes = Math.floor(offset % 60)
      .toString()
      .padStart(2, "0");
    const timezoneName = Intl.DateTimeFormat().resolvedOptions().timeZone;

    return `${date.toLocaleDateString()} | ${date.toLocaleTimeString()} (${offsetOperator}${offsetHours}:${offsetMinutes} ${timezoneName})`;
  }

  /**
   * Выполняет вызов метода логирования.
   * @param {Method} method - Метод логирования.
   * @param {unknown[]} messages - Аргументы метода логирования.
   * @private
   */
  #call(method: Method, messages: unknown[]) {
    console[method](...messages);
  }
}

/**
 * Примеры использования класса Logger:
 *
 * @example
 * // Пример использования метода log без указания флага вывода даты (по умолчанию true)
 * logger.log('Hello world');
 *
 * @example
 * // Пример использования метода log с отключением вывода даты
 * logger.log('Hello world', false);
 *
 * @example
 * // Пример использования метода warn
 * logger.warn('Warning text');
 *
 * @example
 * // Пример использования метода error с передачей объекта ошибки
 * logger.error(new Error('Error text'));
 *
 * @example
 * // Пример использования методов group и groupEnd для создания группы логов
 * logger.group('Group name').log('Hello').log('world').groupEnd();
 */
