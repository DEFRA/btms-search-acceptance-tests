export const decisionToText = async (bool) => {
  if (bool === false) {
    return 'No match'
  } else {
    return 'matched'
  }
}
