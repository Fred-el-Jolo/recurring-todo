import * as filters from "./filters";

export const Todo = function (
  done,
  priority,
  creationDate,
  completionDate,
  title,
  projects,
  contexts,
  specials,
) {

  const due = extractDueDate(specials);
  const auto = extractSpecialProp(specials, 'auto');
  const recurrent = extractSpecialProp(specials, 'recurrent');

  const toString = function () {
    let result = `${filters.todoDone(done)} ${filters.todoPriority(
      priority,
    )} ${filters.date(creationDate)} `;
    result += `${filters.date(completionDate)} ${filters.defaultValue(title, "")} `;
    result += `${filters.prefixArrayValues(
      projects,
      "+",
    )} ${filters.prefixArrayValues(contexts, "@")} `;
    result += filters.todoSpecial('due', due);
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

const prefix = /^(?:(x)\s*){0,1}(?:\(([a-zA-Z])\)\s*){0,1}(?:([0-9]{4}-[0-9]{2}-[0-9]{2})\s*){0,1}(?:([0-9]{4}-[0-9]{2}-[0-9]{2})\s*){0,1}/i;
const projects = /\s*\+([\S]+)/g;
const contexts = /\s*@([\S]+)/g;
const specials = /\s*([\S:]+):([\S:]+)/g;
const date = /^[0-9]{4}-[0-9]{2}-[0-9]{2}$/;

export const parse = (rawValue) => {
  const prefixesData = processPrefixes(rawValue);
  rawValue = prefixesData.rawValue;
  const done = prefixesData.done;
  const priority = prefixesData.priority;
  const creationDate = prefixesData.creationDate != null ? new Date(prefixesData.creationDate) : null;
  const completionDate = prefixesData.completionDate != null ? new Date(prefixesData.completionDate) : null;

  const projectsData = processTokens(rawValue, projects);
  rawValue = projectsData.rawValue;
  const projectsArray = projectsData.results;

  const contextsData = processTokens(rawValue, contexts);
  rawValue = contextsData.rawValue;
  const contextsArray = contextsData.results;

  const specialsData = processSpecials(rawValue, specials);
  rawValue = specialsData.rawValue;
  const specialsArray = specialsData.results;

  const title = rawValue.trim();

  return new Todo(
    done,
    priority,
    creationDate,
    completionDate,
    title,
    projectsArray,
    contextsArray,
    specialsArray,
  );
};

const processPrefixes = (rawValue) => {
  let matchedString, done, priority, creationDate, completionDate;

  const prefixes = prefix.exec(rawValue);
  if (prefixes) {
    matchedString = prefixes[0];
    done = prefixes[1];
    priority = prefixes[2];
    creationDate = prefixes[3];
    completionDate = prefixes[4];
    rawValue = rawValue.replace(matchedString, "");
  }
  return { rawValue, done, priority, creationDate, completionDate };
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
    if (due != null && date.test(due.value)) {
      return due.value;
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
