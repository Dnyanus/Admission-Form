document.addEventListener("DOMContentLoaded", () => {
  const form = document.querySelector("#second-year-form");
  const message = document.querySelector("#form-message");
  const submitButton = form.querySelector(".submit-button");
  const yearField = form.elements.academicYear;
  const currentYear = new Date().getFullYear();

  for (const startYear of [currentYear, currentYear + 1]) {
    const option = document.createElement("option");
    option.value = `${startYear}–${String(startYear + 1).slice(-2)}`;
    option.textContent = option.value;
    yearField.append(option);
  }

  form.elements.phone.addEventListener("input", (event) => {
    event.currentTarget.value = event.currentTarget.value.replace(/\D/g, "").slice(0, 10);
  });

  form.addEventListener("submit", async (event) => {
    event.preventDefault();
    form.classList.add("was-validated");
    if (!form.reportValidity()) return;

    const values = Object.fromEntries(new FormData(form).entries());
    const application = {
      application_type: "second_year",
      applicant_name: values.applicantName.trim(),
      email: values.email.trim(),
      phone: values.phone,
      academic_year: values.academicYear,
      details: {
        collegeName: values.collegeName.trim(),
        rollNumber: values.rollNumber.trim(),
        currentSemester: Number(values.currentSemester),
        previousYearPercentage: Number(values.previousYearPercentage),
        resultStatus: values.resultStatus,
        informationAccurate: true
      }
    };

    submitButton.disabled = true;
    submitButton.firstChild.textContent = "Sending application ";
    try {
      await window.submitAdmissionApplication(application);
      form.reset();
      showMessage("Your B.Com second-year application was submitted successfully.");
    } catch (error) {
      showMessage(error.message || "We could not save your application. Please try again.", true);
    } finally {
      submitButton.disabled = false;
      submitButton.firstChild.textContent = "Submit second-year application ";
    }
  });

  function showMessage(text, isError = false) {
    message.textContent = text;
    message.classList.toggle("error", isError);
    message.hidden = false;
    message.focus();
  }
});

