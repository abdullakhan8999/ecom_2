const calculateEmailSent = (n) => {
  const totalEmailSend = 0;
  for (let i = 0; i < n; i++) {
    const delivery = sendEmail();
    totalEmailSend++;
  }
  return totalEmailSend;
};

describe("Mock function", () => {
  const delivery = {
    passed: 2,
    failed: 3,
  };
  const sendEmail = jest.fn().mockReturnValue(delivery);
  test("First mock example", () => {
    expect(calculateEmailSent(5, sendEmail).toBe(true));
  });
});
