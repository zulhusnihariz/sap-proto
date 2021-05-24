<template>
  <q-card style="min-width: 500px">
    <q-card-section>
      <div class="text-h6">User details</div>
    </q-card-section>
    <q-card-section>
      <q-form @submit.prevent="addUser" class="q-gutter-md">
        <!-- Employee ID & Name -->
        <div class=" q-gutter-xs q-mt-none q-mb-sm row">
          <!-- Employee ID -->
          <div class="col col-shrink  q-mr-sm">
            <q-input
              v-model="empid"
              label="Employee ID"
              dense
              filled
              readonly
            />
          </div>
          <!-- Employee Name -->
          <div class="col">
            <q-input
              dense
              filled
              v-model="name"
              label="Employee Name"
              readonly
            />
          </div>
        </div>
        <!-- Department ID & Name -->
        <div class=" q-gutter-xs q-mt-none q-mb-sm row">
          <!-- Department ID -->
          <div class="col col-shrink  q-mr-sm">
            <q-input
              v-model="departmentid"
              label="Department ID"
              dense
              filled
              readonly
            />
          </div>
          <!-- Department Name -->
          <div class="col">
            <q-input
              dense
              filled
              v-model="department"
              label="Department"
              readonly
            />
          </div>
        </div>
        <!-- Position ID & Name -->
        <div class=" q-gutter-xs q-mt-none q-mb-sm row">
          <div class="col col-shrink q-mr-sm">
            <!-- Position ID -->
            <q-input
              v-model="positionid"
              label="Position ID"
              dense
              filled
              readonly
            />
          </div>
          <!-- Position Title -->
          <div class="col">
            <q-input
              dense
              filled
              v-model="position"
              label="Position Title"
              readonly
            />
          </div>
        </div>
        <!-- Manager ID & Name -->
        <div class=" q-gutter-xs q-mt-none q-mb-sm row">
          <!-- Manager ID -->
          <div class="col col-shrink q-mr-sm">
            <q-input
              v-model="managerid"
              label="Reporting Line ID"
              dense
              filled
              readonly
            />
          </div>
          <!-- Manager Name -->
          <div class="col">
            <q-input
              dense
              filled
              v-model="manager"
              label="Reporting Line"
              readonly
            />
          </div>
        </div>

        <div class=" q-gutter-xs q-mt-none q-mb-sm row">
          <div class="col  q-mr-sm">
            <q-input v-model="gender" label="Gender" dense filled readonly />
          </div>

          <div class="col q-mr-sm">
            <q-input
              v-model="birthdate"
              label="Birth Date"
              dense
              filled
              readonly
            />
          </div>

          <div class="col">
            <q-input
              dense
              filled
              v-model="datejoined"
              label="Date Joined"
              readonly
            />
          </div>
        </div>

        <div class=" q-gutter-xs q-mt-none q-mb-sm row">
          <div class="col  q-mr-sm">
            <q-input
              v-model="maritalstatus"
              label="Marital Status"
              dense
              filled
              readonly
            />
          </div>

          <div class="col q-mr-sm">
            <q-input
              v-model="citizendescription"
              label="Citizenship"
              dense
              filled
              readonly
            />
          </div>

          <div class="col">
            <q-input dense filled v-model="race" label="Race" readonly />
          </div>
        </div>
      </q-form>
    </q-card-section>
  </q-card>
</template>

<script>
export default {
  name: "ViewDetailsCard",
  props: ["selectedUser"],
  data() {
    return {
      empid: this.selectedUser[0].EmpID,
      name: this.selectedUser[0].Name,
      departmentid: this.selectedUser[0].DeptID,
      department: this.selectedUser[0].Department,
      positionid: this.selectedUser[0].PositionID,
      position: this.selectedUser[0].Position,
      managerid: this.selectedUser[0].MngrID,
      manager: this.selectedUser[0].MngrName,
      gender: this.selectedUser[0].Gender,
      birthdate: this.selectedUser[0].BirthDt,
      datejoined: this.selectedUser[0].DtJoined,
      maritalstatus: this.selectedUser[0].MaritalStatus,
      citizendescription: this.selectedUser[0].CitizenDesc,
      race: this.selectedUser[0].Race,

      error: null
    };
  }
};
</script>
