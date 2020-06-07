import * as filters from "./filters";

export const Todo = function (
  done,
  priority,
  creationDate,
  completionDate,
  title,
  projects,
  contexts,
  due,
  auto,
  recurrent,
) {
  const toString = function () {
    let result = `${filters.todoDone(done)} ${filters.todoPriority(
      priority,
    )} ${filters.date(creationDate)} `;
    result += `${filters.date(completionDate)} ${filters.defaultValue(title, "")} `;
    result += `${filters.prefixArrayValues(
      projects,
      "+",
    )} ${filters.prefixArrayValues(contexts, "@")} `;
    result += filters.todoSpecial('due', filters.date(due));
    result += filters.todoSpecial('auto', auto);
    result += filters.todoSpecial('recurrent', recurrent);
    return result;
  };

  return {
    done,
    priority,
    creationDate,
    completionDate,
    title,
    projects,
    contexts,
    due,
    auto,
    recurrent,
    toString,
  };
};

const prefixRegexp = /^(?:(x)\s*){0,1}(?:\(([a-zA-Z])\)\s*){0,1}(?:(today[+-]?[0-9]*[dwmy]?|[0-9]{4}-?[0-9]{2}-?[0-9]{2})\s*){0,1}(?:(today[+-]?[0-9]*[dwmy]?|[0-9]{4}-?[0-9]{2}-?[0-9]{2})\s*){0,1}/i;
const projectsRegexp = /\s+\+([\S]+)/g;
const contextsRegexp = /\s+@([\S]+)/g;
const specialsRegexp = /\s+([\S:]+):([\S:]+)/g;
const dateRegexp = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;
const date2Regexp = /^[0-9]{4}[0-9]{2}[0-9]{2}$/;
const todayRegexp = /^today([+-]?)([0-9]*)([dwmy]?)$/;

export const parse = (rawValue) => {
  const prefixesData = processPrefixes(rawValue);
  rawValue = prefixesData.rawValue;
  const done = prefixesData.done;
  const priority = prefixesData.priority;
  const creationDate = prefixesData.creationDate;
  const completionDate = prefixesData.completionDate;

  const projectsData = processTokens(rawValue, projectsRegexp);
  rawValue = projectsData.rawValue;
  const projectsArray = projectsData.results;

  const contextsData = processTokens(rawValue, contextsRegexp);
  rawValue = contextsData.rawValue;
  const contextsArray = contextsData.results;

  const specialsData = processSpecials(rawValue, specialsRegexp);
  rawValue = specialsData.rawValue;
  const specialsArray = specialsData.results;

  const due = extractDueDate(specialsArray);
  const auto = extractSpecialProp(specialsArray, 'auto');
  const recurrent = extractSpecialProp(specialsArray, 'recurrent');

  const title = rawValue.trim();

  return new Todo(
    done,
    priority,
    creationDate,
    completionDate,
    title,
    projectsArray,
    contextsArray,
    due,
    auto,
    recurrent,
  );
};

const processPrefixes = (rawValue) => {
  let matchedString, done, priority, creationDate, completionDate, recomputedCreationDate, recomputedCompletionDate;

  const prefixes = prefixRegexp.exec(rawValue);
  if (prefixes) {
    matchedString = prefixes[0];
    done = prefixes[1];
    priority = prefixes[2];
    creationDate = prefixes[3];
    completionDate = prefixes[4];
    rawValue = rawValue.replace(matchedString, "");

    recomputedCreationDate = processDate(creationDate);
    recomputedCompletionDate = processDate(completionDate);
  }
  return { rawValue, done, priority, creationDate: recomputedCreationDate, completionDate: recomputedCompletionDate };
};

const processTokens = (rawValue, regexp) => {
  const matches = rawValue.matchAll(regexp);
  const results = [];
  for (const match of matches) {
    // match[0]  // Matched string
    // match[1]  // capturing group
    rawValue = rawValue.replace(match[0], "");
    results.push(match[1]);
  }
  return { rawValue, results };
};

const processSpecials = (rawValue, regexp) => {
  const matches = rawValue.matchAll(regexp);
  const results = [];
  for (const match of matches) {
    // console.dir(match);
    // match[0]  // Matched string
    // match[1]  // capturing group
    rawValue = rawValue.replace(match[0], "");
    results.push({ key: match[1], value: match[2] });
  }
  return { rawValue, results };
};

const extractDueDate = (specials) => {
  if (specials != null && specials.length) {
    const due = specials.find(item => item.key === 'due');
    if (due != null) {
      return processDate(due.value);
    }
  }
  return null;
};

const extractSpecialProp = (specials, key) => {
  if (specials != null && specials.length) {
    const due = specials.find(item => item.key === key);
    if (due != null) {
      return due.value;
    }
  }
  return null;
};

const computeRelativeDate = (inputString) => {
  const computedDate = new Date();

  const todayModifiers = todayRegexp.exec(inputString);
  if (todayModifiers) {
    const operationToken = todayModifiers[1];
    const amountToken = +todayModifiers[2];
    const typeToken = todayModifiers[3];

    if (!isNaN(amountToken)) {
      const operation = operationToken === '+' ? (a, b) => a + b : (a, b) => a - b;

      if (typeToken === null || typeToken === 'd' || typeToken === '') {
        computedDate.setDate(operation(computedDate.getDate(), amountToken));
      }
      else if (typeToken === 'w') {
        computedDate.setDate(operation(computedDate.getDate(), amountToken * 7));
      }
      else if (typeToken === 'm') {
        computedDate.setMonth(operation(computedDate.getMonth(), amountToken));
      }
      else if (typeToken === 'y') {
        computedDate.setFullYear(operation(computedDate.getFullYear(), amountToken));
      }
    }
  }
  return computedDate;
};

const processDate = (inputString) => {
  if (inputString != null) {
    if (inputString.startsWith('today')) {
      return computeRelativeDate(inputString);
    }
    else if (date2Regexp.test(inputString)) {
      return new Date(`${inputString.slice(0, 4)}-${inputString.slice(4, 6)}-${inputString.slice(6)}`);
    }
  }
  else if (dateRegexp.test(inputString)) {
    return new Date(inputString);
  }
  return null;
};
