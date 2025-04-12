## Load Testing Register API

We will be using JMeter to perform load testing for the for the Register API `/api/v1/auth/register`

### Test Strategy
In order to load test Virtual Vault’s Register API, we will be simulating multiple users attempting to register simultaneously to ensure the system maintains acceptable performance levels at baseline, normal, and peak usage.


Assumption: Virtual Vault is a popular e-commerce platform with the following loads for registration

| Usage Level | User Load                        | Rationale                                           |
|-------------|----------------------------------|----------------------------------------------------|
| Baseline    | 1 User/s for 1 min (60 new registrations)   | To establish baseline performance                |
| Normal      | 5 User/s for 1 min (300 new registrations)  | Simulate expected average number of concurrent registrations |
| Peak*       | 30 User/s for 1 min (1800 new registrations)| Simulate maximum expected number of concurrent registrations |



*Peak usage can be expected during e-commerce events such as Black Friday Sales or 11.11 when huge discounts entice a large number of new users to register for an account to shop.

### Success Criteria
- 99% of registration transactions are completed in under 1 seconds
- System maintains stability with no errors at peak load
- Database can handle the volume of new user data efficiently


### Test Prerequisites
- Open the directory containing the Jmeter test plans for the corresponding usage level
  - Eg. `<usage_level> Load Test.jmx`
- Verify userdata.csv is in the same directory and contains the 1800 rows of user data which will be used by JMeter to register new users.

### Test Steps
1. Run Virtual Vault locally with a test database consisting of empty users
2. Run the corresponding test plan with this JMeter CLI command
    - Eg. `jmeter -n -t <usage_level>\ Load\ Test.jmx -l report_folder/baseline/results_<usage_level>.jtl -e -o report_folder/<usage_level>/`
3. View the HTML report located at `​​report_folder/baseline/index.html`
4. Verify on MongoDB Atlas that the correct number of new users is created in the `users` collection
5. Clear users in the `users` collection to prepare for the next test
